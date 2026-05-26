from fastapi import APIRouter

from app.models.schemas import (
    IngestRequest,
    QueryRequest
)

from app.services.ingestion import ( ingest_document )

from app.services.retrieval import ( query_document )

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

@router.post("/ingest")
def ingest(req: IngestRequest):

    result = ingest_document(
        req.pdf_path,
        req.document_id
    )

    return result


@router.post("/query")
def query(req: QueryRequest):

    result = query_document(
        req.document_id,
        req.question
    )

    return result