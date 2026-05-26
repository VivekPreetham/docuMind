import { useEffect, useState } from "react";

import api from "../services/api"

export default function Dashboard() {
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        const res = await api.get("/documents");

        setDocuments(res.data);
    };

    return (
        <div>

            <h1>Documents</h1>

            {
                documents.map((doc) => {
                    <div key={doc._id}>
                        {doc.originalName}
                    </div>
                })
            }

        </div>
    );
}