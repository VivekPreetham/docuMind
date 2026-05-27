import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import ChatBox from "../components/ChatBox";

export default function ChatPage() {
    
    const { documentId } = useParams();

    return(
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar />

            <div className="max-w-5xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8">
                    Chat With PDF
                </h1>

                <ChatBox 
                    documentId={documentId}
                />
            </div>
        </div>
    );
}   