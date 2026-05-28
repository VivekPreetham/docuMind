const axios = require("axios");

const RAG_API_URL =
  process.env.RAG_API_URL;

exports.ingestPDF = async (
  pdfPath,
  documentId
) => {

  const response =
    await axios.post(

      `${RAG_API_URL}/ingest`,

      {

        pdf_path: pdfPath,

        document_id: documentId

      }

    );

  return response.data;

};

exports.queryPDF = async (
  documentId,
  question
) => {

  const response =
    await axios.post(

      `${RAG_API_URL}/query`,

      {

        document_id: documentId,

        question

      }

    );

  return response.data;

};