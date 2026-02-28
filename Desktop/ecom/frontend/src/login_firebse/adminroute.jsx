import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../login_firebse/firebase";
import axios from "axios";

const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async (user) => {
            if (user) {
                try {
                    const res = await axios.get(`https://adiecom.onrender.com/api/users/${user.uid}`);
                    setIsAdmin(res.data.role === 'admin');
                } catch (err) {
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        };

        const unsubscribe = auth.onAuthStateChanged(checkAdmin);
        return () => unsubscribe();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-black">VERIFYING ADMIN...</div>;

    if (!isAdmin) {
        alert("Access Denied: Admins Only");
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;