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

exports.deleteDocument = async (
  req,
  res
) => {

  try {

    await Document.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message: "Document Deleted!"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: error.message

    });

  }

};