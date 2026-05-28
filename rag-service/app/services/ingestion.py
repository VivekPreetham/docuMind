import os

import fitz

from langchain_text_splitters import( RecursiveCharacterTextSplitter )

from langchain_community.vectorstores import( FAISS )

from app.config import (
    FAISS_INDEX_DIR,
    CHUNK_SIZE,
    CHUNK_OVERLAP
)

from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings
)

embedding_model = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001"
    )


def extract_text_from_pdf(pdf_path):
    
    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    return text



def split_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    )

    chunks = splitter.split_text(text)

    return chunks



def create_faiss_index(chunks, document_id):
    
    vectorstore = FAISS.from_texts(
        chunks,
        embedding_model
    )

    save_path = os.path.join(
        FAISS_INDEX_DIR,
        document_id
    )

    vectorstore.save_local(save_path)

    return save_path



def ingest_document(pdf_path, document_id):

    text = extract_text_from_pdf(pdf_path)

    chunks = split_text(text)

    index_path = create_faiss_index(chunks, document_id)

    return {
        "status": "success",
        "chunk_count": len(chunks),
        "index_path": index_path
    }
