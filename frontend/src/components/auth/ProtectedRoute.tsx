import { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { state } = useAuth();
    const location = useLocation();

    if (state.loading) return null; // o splash
    if (!state.user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
}
