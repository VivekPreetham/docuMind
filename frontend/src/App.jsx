import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import ChatPage from "./pages/ChatPage";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (

    <Routes>

      <Route 
        path="/login"
        element={<Login />}
      />

      <Route 
        path="/register"
        element={<Register />}
      />

      <Route 
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/chat/:documentId"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}