from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.rag import router

app = FastAPI(title="DocuMind RAG Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://documind-itgh.onrender.com",
        "https://documind-tan.vercel.app",
        "http://localhost:5000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "RAG Service Running"}