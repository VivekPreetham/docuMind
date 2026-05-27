import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const tokenExists = true;

    return tokenExists
        ? children
        : <Navigate to="/login"/>
}