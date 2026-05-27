const ChatSession = require(
  "../models/ChatSession"
);

const {
  queryPDF
} = require(
  "../services/ragService"
);

exports.sendMessage = async (
  req,
  res
) => {

  try {

    const { message } = req.body;

    const { documentId } =
      req.params;

    let session =
      await ChatSession.findOne({

        documentId,

        userId: req.user.id

      });

    if (!session) {

      session =
        await ChatSession.create({

          documentId,

          userId: req.user.id,

          messages: []

        });

    }

    const ragResponse =
      await queryPDF(

        documentId,

        message

      );

    session.messages.push({

      role: "user",

      content: message

    });

    session.messages.push({

      role: "assistant",

      content: ragResponse.answer,

      sources: ragResponse.sources

    });

    await session.save();

    res.json(ragResponse);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: error.message

    });

  }

};