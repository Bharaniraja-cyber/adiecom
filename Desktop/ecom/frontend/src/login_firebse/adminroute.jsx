import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../login_firebse/firebase";
import axios from "axios";

const API_URL = "https://adiecom.onrender.com";

const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                // Not even logged in
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                // Check role from your MongoDB
                const res = await axios.get(`${API_URL}/api/users/${user.uid}`);
                
                // Ensure we handle cases where res.data might be empty
                if (res.data && res.data.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (err) {
                console.error("Admin verification failed:", err);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center font-black uppercase italic tracking-tighter bg-white">
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                Verifying Credentials...
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;