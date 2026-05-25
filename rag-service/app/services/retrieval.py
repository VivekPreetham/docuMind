import os 

from langchain_community.vectorstores import ( FAISS )

from langchain_community.embeddings import ( HuggingFaceBgeEmbeddings )

from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import(
    FAISS_INDEX_DIR,
    TOP_K_RESULTS
)

embedding_model = HuggingFaceBgeEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.3
)



def load_vectorstore(document_id):

    index_path = os.path.join(
        FAISS_INDEX_DIR,
        document_id
    )

    db = FAISS.load_local(
        index_path,
        embedding_model,
        allow_dangerous_deserialization=True
    )

    return db



def retrieve_chunks(db, question):

    docs = db.similarity_search_with_score(
        question,
        k=TOP_K_RESULTS
    )

    return docs



def build_context(docs):

    context = ""

    sources = []

    for doc, score in docs:

        context += doc.page_content + "\n\n"

        sources.append({
            "chunkText": doc.page_content,
            "score": float(score)
        })

    return context, score


def generate_answer( context, question ):
    
    prompt = f"""
You are a helpful AI assistant.

Answer ONLY from the provided context.

If answer is not present in the context,
say: 
"I could not find the answer in the document."

Context: {context}

Question: {question}

"""
    
    response = llm.invoke(prompt)

    return response.content


def query_document( document_id, question ):

    db = load_vectorstore(document_id)

    docs = retrieve_chunks(db, question)

    context, sources = build_context(docs)

    answer = generate_answer(context, question)

    return {
        "answer": answer,
        "sources": sources
    }