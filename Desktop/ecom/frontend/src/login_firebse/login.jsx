import { useEffect, useState } from "react";
import auth from "./firebase";
import { 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    sendPasswordResetEmail 
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import adidas from "../assets/689347.jpg";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //  Add the Password Reset Logic
    const handleForgotPassword = () => {
        if (!email) {
            alert("Please enter your email address first.");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset link sent! Check your inbox.");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    function handleLogin() {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/dashboard");
            })
            .catch((err) => {
                alert(err.message);
                setLoading(false);
            });
    }

    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => navigate("/dashboard"))
            .catch((err) => alert(err.message));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/dashboard", { replace: true });
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="p-10 flex bg-white flex-col items-center justify-center w-full min-h-screen font-sans px-4">
            <div className="flex border border-black flex-col w-full max-w-[450px] p-6 md:p-10 shadow-sm">
                <img src={adidas} className="w-16 md:w-20 mb-6 md:mb-8 self-center" alt="logo" />
                
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-1 md:mb-2">Login</h1>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 md:mb-8">Welcome Back</p>
                
                <div className="space-y-4">
                    <input 
                        type="text" 
                        className="border-b-2 border-gray-200 focus:border-black p-3 w-full outline-none transition-all uppercase text-xs font-bold tracking-widest" 
                        placeholder="Email Address *" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        className="border-b-2 border-gray-200 focus:border-black p-3 w-full outline-none transition-all uppercase text-xs font-bold tracking-widest" 
                        placeholder="Password *" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    {/* 3. Add Forgot Password Link */}
                    <div className="flex justify-end">
                        <button 
                            onClick={handleForgotPassword}
                            className="text-[10px] font-black uppercase tracking-widest underline hover:text-gray-500 transition-colors"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button 
                        className="py-4 bg-black text-white w-full font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex justify-between px-6 items-center group active:scale-[0.98]" 
                        onClick={handleLogin}
                    >
                        {loading ? "Logging in..." : "Login"}
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>

                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full py-4 border-2 border-black font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98]"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="G" />
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-center">
                    New to Adidas? <a href="/signup" className="underline hover:text-gray-400">Create an Account</a>
                </p>
            </div>
        </div>
    );
}

export default Login;