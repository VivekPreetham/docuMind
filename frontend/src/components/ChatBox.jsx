import { useState } from "react";

import api from "../services/api";

import MessageBubble from "./MessageBubble";

export default function ChatBox({
  documentId
}) {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    // User message

    const userMessage = {

      role: "user",

      content: message

    };

    // Add user message safely

    setMessages((prev) => [

      ...prev,

      userMessage

    ]);

    try {

      const response =
        await api.post(

          `/chat/${documentId}/message`,

          { message }

        );

      console.log(
        "AI RESPONSE:",
        response.data
      );

      // AI message

      const aiMessage = {

        role: "assistant",

        content:
          response.data.answer ||

          "No answer returned"

      };

      // Append AI message safely

      setMessages((prev) => [

        ...prev,

        aiMessage

      ]);

      setMessage("");

    } catch (error) {

      console.error(error);

      alert("Message Failed");

    }

  };

  return (

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-[80vh] flex flex-col">

      <div className="flex-1 overflow-y-auto mb-4">

        {

          Array.isArray(messages)

          &&

          messages.map((msg, index) => (

            <MessageBubble

              key={index}

              role={msg.role}

              content={msg.content}

            />

          ))

        }

      </div>

      <div className="flex gap-4">

        <input

          value={message}

          onChange={(e) =>
            setMessage(e.target.value)
          }

          placeholder="Ask anything about document..."

          className="flex-1 bg-slate-700 p-4 rounded-lg outline-none"

        />

        <button

          onClick={sendMessage}

          className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded-lg font-semibold"

        >

          Send

        </button>

      </div>

    </div>

  );
}