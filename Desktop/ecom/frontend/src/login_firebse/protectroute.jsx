import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center font-black">LOADING...</div>;
    }

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;