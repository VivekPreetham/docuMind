const Document = require("../models/Document");

const { ingestPdf, ingestPDF } = require("../services/ragService")

exports.uploadDocument = async (req, res) => {
    
    try {
        
        if(!req.file){
            return res.status(400).json({
                message: "No file uploaded"
            }); 
        }

        const file = req.file;
        // Create MongoDB document first
        const document = await Document.create({
            userId: req.user.id,
            originalName: file.originalname,
            storedName: file.filename,
            filePath: file.path,
            fileSize: file.size,
            status: "pending"
        });

        // Call FastAPI ingestion endpoint

        const result = await ingestPDF(
            file.path,
            document._id.toString()
        );

        // Update MongoDB document

        document.chunkCount = result.chunkCount;

        document.faissIndexPath = result.index_path;

        document.status = "ready";

        await document.save();

        res.status(201).json({
            message: "Document uploaded successfully",
            document
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
        userId: req.user.id
        });

    res.json(documents);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteDocument = async (req, res) => {

    try {
        
        await Document.findByIdAndDelete(req.params.id);

        res.json({
            message: "Document Deleted!"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
};