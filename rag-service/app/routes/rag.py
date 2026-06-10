from fastapi import APIRouter, UploadFile, File, Form
import tempfile
import os

from app.services.ingestion import ingest_document
from app.services.retrieval import query_document
from app.models.schemas import QueryRequest

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "healthy"}

@router.post("/ingest")
async def ingest(
    file: UploadFile = File(...),
    document_id: str = Form(...)
):

    suffix = os.path.splitext(file.filename)[1] or ".pdf"
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    ) as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        result = ingest_document(tmp_path, document_id)
    finally:
        # Clean up temp file after ingestion
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    return result

@router.post("/query")
def query(req: QueryRequest):
    result = query_document(
        req.document_id,
        req.question
    )
    return result