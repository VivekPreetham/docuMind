from fastapi import FastAPI

from app.routes.rag import router

app = FastAPI(
    title="DocuMind RAG Service"
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "message": "RAG Service Running"
    }