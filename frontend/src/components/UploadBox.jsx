import { useState } from "react";

import api from "../services/api";

export default function UploadBox({
    refreshDocuments
}) {
    const [file, setFile] = useState(null);

    const uploadFile = async () => {
        
        if(!file) return;

        const formData = new FormData();

        formData.append("file", file);

        try {
            
            await api.post(
                "/documents/upload",
                formData
            );

            alert("Upload Successful");

            refreshDocuments();

        } catch (error) {
            console.log(error);

            alert("Upload Failed");
            
        }
    };

    return (

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col gap-4">

            <input 
                type="file"
                accept=".pdf"
                className="bg-slate-700 p-3 rounded-lg"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }    
            />

            <button
                onClick={uploadFile}
                className="bg-cyan-500 hover:bg-cyan-600 transition px-4 py-3 rounded-lg font-semibold"
            >
                Upload PDF
            </button>

        </div>
    );
}