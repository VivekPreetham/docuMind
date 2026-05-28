const Document = require(
  "../models/Document"
);

const path = require("path");

const {
  ingestPDF
} = require(
  "../services/ragService"
);

exports.uploadDocument = async (
  req,
  res
) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        message: "No file uploaded"

      });

    }

    const file = req.file;

    // Create MongoDB document

    const document =
      await Document.create({

        userId: req.user.id,

        originalName:
          file.originalname,

        storedName:
          file.filename,

        filePath:
          file.path,

        fileSize:
          file.size,

        status: "processing"

      });

    // Convert to absolute path

    const absolutePath =
      path.resolve(file.path);

    console.log(
      "Absolute PDF Path:",
      absolutePath
    );

    // Call FastAPI ingestion

    const result =
      await ingestPDF(

        absolutePath,

        document._id.toString()

      );

    // Update document

    document.chunkCount =
      result.chunk_count;

    document.faissIndexPath =
      result.index_path;

    document.status = "ready";

    await document.save();

    res.status(201).json({

      message:
        "Document uploaded successfully",

      document

    });

  } catch (error) {

    console.error(
      "Upload Error:",
      error.response?.data || error.message
    );

    res.status(500).json({

      message:
        error.response?.data?.message ||
        error.message

    });

  }

};

exports.getDocuments = async (
  req,
  res
) => {

  try {

    const documents =
      await Document.find({

        userId: req.user.id

      });

    res.json(documents);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const fs = require("fs");

exports.deleteDocument = async (
  req,
  res
) => {

  try {

    const document =
      await Document.findById(
        req.params.id
      );

    if (!document) {

      return res.status(404).json({

        message: "Document not found"

      });

    }

    // Delete uploaded PDF

    if (
      fs.existsSync(document.filePath)
    ) {

      fs.unlinkSync(
        document.filePath
      );

    }

    // Delete MongoDB document

    await Document.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
        "Document Deleted Successfully"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: error.message

    });

  }

};