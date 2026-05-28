import os

from langchain_community.vectorstores import FAISS

from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings
)

embedding_model = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001"
    )

from langchain_groq import ChatGroq

from app.config import (
    FAISS_INDEX_DIR,
    TOP_K_RESULTS
)

llm = ChatGroq(

    groq_api_key=os.getenv(
        "GROQ_API_KEY"
    ),

    model_name="llama-3.1-8b-instant"

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

    return context, sources


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