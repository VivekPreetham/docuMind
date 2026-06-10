const Document = require(
  "../models/Document"
);

const path = require("path");
const fs = require("fs");                
const FormData = require("form-data");   

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

    const form = new FormData();
    form.append(
      "file",
      fs.createReadStream(file.path),
      {
        filename: file.originalname,
        contentType: "application/pdf"
      }
    );
    form.append(
      "document_id",
      document._id.toString()
    );


    const result =
      await ingestPDF(
        form,
        document._id.toString()
      );


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

    const document =
      await Document.findById(
        req.params.id
      );

    if (!document) {

      return res.status(404).json({

        message: "Document not found"

      });

    }

    if (
      fs.existsSync(document.filePath)
    ) {

      fs.unlinkSync(
        document.filePath
      );

    }

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