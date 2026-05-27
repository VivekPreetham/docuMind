import { useState } from "react";

import {
    useNavigate,
    Link,
    Await
} from "react-router-dom";

import api from "../services/api";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const register = async () => {
        
        try {
            await api.post("/auth/register", {
                name,
                email,
                password
            });

            navigate("/login");
            
        } catch (error) {
            console.log(error);
            alert("Register Failed");
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-900">
            <div className="bg-slate-800 p-10 rounded-2xl w-100 shadow-xl">
                <h1 className="text-3xl font-bold mb-8 text-cyan-400 text-center">
                    Register
                </h1>

                <div className="flex flex-col gap-4">

                    <input 
                        placeholder="Name"
                        className="bg-slate-700 rounded-lg outline-none"
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        placeholder="Email"
                        className="bg-slate-700 p-4 rounded-lg outline-none"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-slate-700 p-4 rounded-lg outline-none"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        onClick={register}
                        className="bg-cyan-500 hover:bg-cyan-600 py-4 rounded-lg font-bold"
                    >
                        Register
                    </button>

                    <Link
                        to="/login"
                        className="text-center text-cyan-400"
                    >
                        Already have account?
                    </Link>
                </div>
            </div>
        </div>
    );
}