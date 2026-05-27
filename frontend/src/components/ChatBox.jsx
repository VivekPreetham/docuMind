import { useState } from "react";

import api from "../services/api";

import MessageBubble from "./MessageBubble";

export default function ChatBox({documentId}) {
    
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        
        if(!message) return;

        const userMessage = {
            role: "user",
            content: message
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        try {
            
            const response = await api.post(
                `/chat/${documentId/message}`,
                { message }
            );

            const aiMessage = {
                role: "assistant",
                content: response.data.answer
            };

            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);

            setMessages("");

        } catch (error) {
            console.log(error);

            alert("Message Failed");
            
        }
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-[80vh] flex flex-col">

            <div className="flex-1 overflow-y-auto mb-4">

                {
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

                    placeholder="Ask anything about the document..."

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
