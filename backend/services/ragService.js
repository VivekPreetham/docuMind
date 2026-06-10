const axios = require("axios");

const RAG_API_URL = process.env.RAG_API_URL;


exports.ingestPDF = async (formData, documentId) => {
  const response = await axios.post(
    `${RAG_API_URL}/ingest`,
    formData,
    {
      headers: formData.getHeaders(),
      timeout: 120000, // 2 min — embedding model cold start
    }
  );
  return response.data;
};

exports.queryPDF = async (documentId, question) => {
  const response = await axios.post(
    `${RAG_API_URL}/query`,
    { document_id: documentId, question },
    { timeout: 60000 } // 1 min
  );
  return response.data;
};