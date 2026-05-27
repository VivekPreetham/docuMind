import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../services/api"

import Navbar from "../components/Navbar";

import UploadBox from "../components/UploadBox";

export default function Dashboard() {
    const [ documents, setDocuments ] = useState([]);

    const fetchDocuments = async () => {
        try {
            const response = await api.get("/documents");

            setDocuments(response.data);
            
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar />

            <div className="max-w-6xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                <UploadBox 
                    refreshDocuments={fetchDocuments}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {
                        documents.map((doc) => (
                            <div
                                key={doc._id}
                                className="bg-slate-800 p-6 rounded-xl shadow-lg"
                            >
                                <h3 className="text-xl font-bold mb-4">
                                    {doc.originalName}
                                </h3>

                                <p className="mb-4">
                                    Status:
                                    {" "}
                                    <span className="text-cyan-400">  
                                        {doc.status}
                                    </span>
                                </p>

                                <Link 
                                    to={`/chat/${doc._id}`}
                                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg inline-block"
                                >
                                    Open Chat
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}