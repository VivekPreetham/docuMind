const ChatSession = require("../models/ChatSession");

const { queryPDF } = require("../services/ragService");

exports.sendMessage = async (req, res) => {
    
    const { message } = req.body;

    const { documentId } = req.params;

    let session = await ChatSession.findOne({
        documentId,
        userId: req.user.id
    });

    if(!session) {
        session = await ChatSession.create({
            documentId,
            userId: req.user.id,
            messages: []
        });
    }

    const ragResponse = await queryPDF(
        documentId, 
        message
    );

    session.messages.push({
        role: "User",
        content: message
    });

    session.messages.push({
        role: "assistant",
        content: ragResponse.answer,
        sources: ragResponse.sources
    });

    await session.save();

    res.json(ragResponse);
}