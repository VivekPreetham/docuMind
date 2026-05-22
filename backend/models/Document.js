const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        originalName: String,

        storedName: String,

        filePath: String,

        fileSize: Number,

        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "ready",
                "accepted"
            ],
            default: "pending"
        },
        chunkCount: {
            type: Number,
            default: 0
        },

        faissIndexPath: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Document", documentSchema);