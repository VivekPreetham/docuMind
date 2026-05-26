const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        role: String,

        content: String,

        sources: Array
    },
    {
        timestamps: true
    }
);

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document"
        },

        messages: [messageSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ChatSession",
    chatSchema
)