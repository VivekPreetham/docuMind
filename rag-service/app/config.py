import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

FAISS_INDEX_DIR = os.getenv("FAISS_INDEX_DIR")

CHUNK_SIZE = int(os.getenv("CHUNK_SIZE"))

CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP"))

TOP_K_RESULTS = int(os.getenv("TOP_K_RESULTS"))