const axios = require("axios");

const ingestPDF = async (pdfPath, documentId) => {
    const response = await axios.post(
        "http://localhost:8000/ingest",
        {
            pdf_path: pdfPath,
            document_id: documentId
        }
    );

    return response.data;
};

const queryPDF = async (documentId, question) => {
    const response = await axios.post(
        "http://localhost:8000/query",
        {
            document_id: documentId,
            question
        }
    );

    return response.data;
};

module.exports = {
    ingestPDF,
    queryPDF
};