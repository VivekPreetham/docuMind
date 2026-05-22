from pydantic import BaseModel

class IngestRequest(BaseModel):

    pdf_path: str

    document_id: str

class QueryRequest(BaseModel):

    document_id: str

    question: str