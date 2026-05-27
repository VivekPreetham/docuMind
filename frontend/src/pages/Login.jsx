import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      await api.post("/auth/login", {

        email,
        password

      });

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-900">

      <div className="bg-slate-800 p-10 rounded-2xl w-100 shadow-xl">

        <h1 className="text-3xl font-bold mb-8 text-cyan-400 text-center">

          Login

        </h1>

        <div className="flex flex-col gap-4">

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
            onClick={login}
            className="bg-cyan-500 hover:bg-cyan-600 py-4 rounded-lg font-bold"
          >
            Login
          </button>

          <Link
            to="/register"
            className="text-center text-cyan-400"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>

  );
}
