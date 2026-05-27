const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require(
  "../middleware/uploadMiddleware"
);
const {
    uploadDocument,
    getDocuments,
    deleteDocument
} = require("../controllers/uploadDocumentController");

router.get(
    "/",
    authMiddleware,
    getDocuments
);

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadDocument
);

router.delete(
    "/:id",
    authMiddleware,
    deleteDocument
);

module.exports = router;