const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
    
    try {
        
        if(!req.file){
            return res.status(400).json({
                message: "No file uploaded"
            }); 
        }

        const file = req.file;
        const document = await Document.create({
            userId: req.user.id,
            originalName: file.originalname,
            storedName: file.filename,
            filePath: file.path,
            fileSize: file.size,
            status: "pending"
        });

        res.status(201).json(document);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getDocuments = async (req, res) => {
    const documents = await Document.find({
        userId: req.user.id
    });

    res.json(documents);
};

exports.deleteDocument = async (req, res) => {
    await Document.findByIdAndDelete(req.params.id);

    res.json({
        message: "Document Deleted!"
    });
};