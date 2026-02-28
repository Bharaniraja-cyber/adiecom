import { useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import auth from "./firebase"; // Ensure path to your firebase config is correct
import adidas from "../assets/689347.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    // Logic to save user to MongoDB after Firebase auth success
    const syncUserToMongoDB = async (user) => {
        try {
            await axios.post(`${API_URL}/api/users/register`, {
                uid: user.uid,
                email: user.email
            });
        } catch (err) {
            console.error("Error syncing user to database:", err);
        }
    };

    const handleSignup = async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await syncUserToMongoDB(userCredential.user);
            alert("Signup successful");
            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            await syncUserToMongoDB(result.user);
            alert("Signup successful");
            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white flex flex-col justify-center items-center w-full min-h-screen font-sans px-4 py-10">
            {/* Main Container - Responsive width */}
            <div className="flex border border-black flex-col w-full max-w-[650px] p-6 md:p-5 shadow-sm">
                <img 
                    src={adidas} 
                    className="w-16 md:w-20 mb-6 md:mb-8 self-center cursor-pointer" 
                    alt="adidas logo" 
                    onClick={() => navigate("/")}
                />

                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-1 md:mb-2 text-left">
                    Join Us
                </h1>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 md:mb-8 text-left">
                    Create your Adidas Profile
                </p>
                
                <div className="space-y-4 md:space-y-5">
                    {/* Email Input */}
                    <div className="flex flex-col">
                        <input 
                            type="text" 
                            className="border-b-2 border-gray-200 focus:border-black p-3 w-full outline-none uppercase text-xs font-bold tracking-widest transition-all" 
                            placeholder="Email Address *" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col">
                        <input 
                            type="password" 
                            className="border-b-2 border-gray-200 focus:border-black p-3 w-full outline-none uppercase text-xs font-bold tracking-widest transition-all" 
                            placeholder="Password *" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="flex flex-col">
                        <input 
                            type="password" 
                            className="border-b-2 border-gray-200 focus:border-black p-3 w-full outline-none uppercase text-xs font-bold tracking-widest transition-all" 
                            placeholder="Confirm Password *" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        className="py-4 bg-black text-white w-full font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex justify-between px-6 items-center group active:scale-[0.98]" 
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? "Creating Profile..." : "Register"}
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>

                    <div className="flex items-center gap-2 py-2">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Google Signup */}
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full py-4 border-2 border-black text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98]"
                    >
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            className="w-4 h-4" 
                            alt="G" 
                        />
                        Signup with Google
                    </button>
                </div>

                <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-center">
                    Already a member? <a href="/" className="underline hover:text-gray-400">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;