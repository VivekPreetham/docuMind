# DocuMind – AI-Powered RAG Document Intelligence Platform

DocuMind is a full-stack Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents and interact with them through an AI-powered conversational interface.

The platform combines semantic search, vector embeddings, FAISS indexing, and Large Language Models (LLMs) to deliver context-aware answers strictly grounded in uploaded document content.

Built using React, Node.js, FastAPI, MongoDB Atlas, LangChain, FAISS, and Ollama-hosted Llama 3 models.

---

# Features

* PDF upload and ingestion pipeline
* AI-powered document chat using RAG
* Semantic retrieval using vector embeddings
* FAISS vector database integration
* Ollama-hosted local LLM inference (Llama 3)
* JWT Authentication & Protected Routes
* Chat session persistence
* MongoDB Atlas integration
* FastAPI microservice architecture
* Full-stack MERN + Python hybrid architecture
* Tailwind CSS modern responsive UI

---

# System Architecture

```text
Frontend (React + Tailwind)
        ↓
Node.js / Express Backend
        ↓
FastAPI RAG Service
        ↓
PDF Extraction + Chunking
        ↓
HuggingFace Embeddings
        ↓
FAISS Vector Store
        ↓
Ollama (Llama 3)
        ↓
Context-Aware AI Responses
```

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Multer

## AI / RAG Service

* FastAPI
* LangChain
* FAISS
* PyMuPDF
* HuggingFace Embeddings
* Ollama
* Llama 3

---

# Project Workflow

## 1. User Authentication

* Users register/login securely using JWT authentication.
* Protected routes ensure authorized document access.

## 2. PDF Upload

* PDFs are uploaded using Multer middleware.
* Files are stored locally in backend uploads folder.

## 3. Document Ingestion

* Backend sends uploaded PDF path to FastAPI ingestion service.
* PyMuPDF extracts text from PDFs.
* LangChain recursively chunks text into smaller semantic chunks.

## 4. Embedding Generation

* HuggingFace embedding models convert text chunks into vectors.
* Vector embeddings are stored inside FAISS indexes.

## 5. Semantic Retrieval

* User questions are embedded using the same embedding model.
* FAISS performs similarity search to retrieve top relevant chunks.

## 6. AI Response Generation

* Retrieved chunks are passed as context to Llama 3 through Ollama.
* AI generates grounded responses only from uploaded document context.

## 7. Chat Persistence

* Chat history is stored in MongoDB using session-based architecture.

---

# Folder Structure

```text
docuMind/
│
├── frontend/                 # React Frontend
│
├── backend/                # Node.js Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── uploads/
│
├── rag-service/            # FastAPI RAG Service
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── config.py
│   └── faiss_indexes/
│
└── README.md
```

---

# Installation & Setup

# 1. Clone Repository

```bash
git clone https://github.com/VivekPreetham/docuMind.git

cd docuMind
```

---

# 2. Setup Frontend

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 3. Setup Backend

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 4. Setup FastAPI RAG Service

```bash
cd rag-service

python -m venv venv
```

## Activate venv (Windows Git Bash)

```bash
source venv/Scripts/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run FastAPI

```bash
uvicorn app.main:app --reload --port 8000
```

FastAPI runs on:

```text
http://localhost:8000
```

---

# 5. Setup Ollama

Install Ollama:

https://ollama.com

Run Llama 3:

```bash
ollama run llama3
```

---

# Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

JWT_EXPIRES_IN=7d
```

---

## RAG Service (.env)

```env
FAISS_INDEX_DIR=./faiss_indexes
```

---

# API Endpoints

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

## Documents

* GET `/api/documents`
* POST `/api/documents/upload`
* DELETE `/api/documents/:id`

## Chat

* POST `/api/chat/:documentId/message`

## FastAPI

* POST `/ingest`
* POST `/query`

---

# Key Learnings

Through this project, I gained hands-on experience in:

* Retrieval-Augmented Generation (RAG)
* LLM integration using Ollama
* Semantic search systems
* Vector databases and FAISS
* LangChain workflows
* Full-stack AI application architecture
* Authentication and protected APIs
* FastAPI microservice design
* Debugging distributed AI systems
* End-to-end AI deployment workflows

---

# Future Improvements

* Cloud deployment (AWS/GCP)
* Streaming AI responses
* Multi-document querying
* Citation-based responses
* Docker containerization
* Role-based authentication
* Hybrid search (BM25 + Vector Search)
* Redis caching
* WebSocket-based chat updates

---

# Author

Vivek Preetham Mekala

GitHub: https://github.com/VivekPreetham

LinkedIn: https://www.linkedin.com/in/vivek-preetham-714a632a6/
