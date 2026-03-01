import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Stepper from "./Stepper";
import axios from "axios";
import auth from "../login_firebse/firebase"; // Import your firebase config


function AddressPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [saveForFuture, setSaveForFuture] = useState(false);

    const [address, setAddress] = useState({
        fullName: "", phone: "", pin: "", street: "", city: "", stateName: ""
    });

    // 1. Monitor Auth State
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/login"); // Security: Redirect if not logged in
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // 2. Fetch Saved Address from DB
    useEffect(() => {
        const fetchUserAddress = async () => {
            if (user?.uid) {
                try {
                    const res = await axios.get(`https://adiecom.onrender.com/api/users/${user.uid}`);
                    if (res.data.savedAddress) {
                        setAddress(res.data.savedAddress);
                    }
                } catch (err) {
                    console.error("Error fetching address:", err);
                }
            }
        };
        fetchUserAddress();
    }, [user]);

    const checkoutData = location.state || { cartItems: [], total: 0 };
    const { cartItems, total } = checkoutData;

    const handleInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleDeliverHere = async (e) => {
        e.preventDefault();
        
        if (Object.values(address).some(val => val === "")) {
            alert("Please fill all fields");
            return;
        }

        // 3. Save to DB only if checkbox is checked
        if (saveForFuture && user?.uid) {
            try {
                await axios.put(`https://adiecom.onrender.com/api/users/address/${user.uid}`, { address });
            } catch (err) {
                console.error("Failed to save address to profile");
            }
        }

        navigate("/verify-purchase", {
            state: { ...checkoutData, address: address }
        });
    };

    if (cartItems.length === 0 && !location.state?.price) {
        return <div className="p-20 text-center uppercase font-black">Your bag is empty. <button onClick={() => navigate("/")} className="underline">Shop Now</button></div>;
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />
            <Stepper activeStep={0} />

            <div className="max-w-6xl mx-auto p-10 flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    <h1 className="text-2xl font-black uppercase mb-8 italic tracking-tighter">Shipping Address</h1>
                    
                    <form onSubmit={handleDeliverHere} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="fullName" value={address.fullName} placeholder="FULL NAME *" className="border border-black p-4 outline-none text-xs font-bold uppercase tracking-widest focus:bg-gray-50" onChange={handleInput} />
                        <input required name="phone" value={address.phone} placeholder="PHONE NUMBER *" className="border border-black p-4 outline-none text-xs font-bold uppercase tracking-widest focus:bg-gray-50" onChange={handleInput} />
                        <input required name="pin" value={address.pin} placeholder="PIN CODE *" className="border border-black p-4 outline-none text-xs font-bold uppercase tracking-widest focus:bg-gray-50" onChange={handleInput} />
                        <input required name="street" value={address.street} placeholder="STREET / LANDMARK *" className="border border-black p-4 outline-none md:col-span-2 text-xs font-bold uppercase tracking-widest focus:bg-gray-50" onChange={handleInput} />
                        <input required name="city" value={address.city} placeholder="CITY *" className="border border-black p-4 outline-none text-xs font-bold uppercase tracking-widest focus:bg-gray-50" onChange={handleInput} />
                        <input required name="stateName" value={address.stateName} placeholder="STATE *" className="border border-black p-4 outline-none text-xs font-bold uppercase tracking-widest focus:bg-gray-50" onChange={handleInput} />
                        
                        {/* 4. SAVE ADDRESS CHECKBOX */}
                        <div className="md:col-span-2 flex items-center gap-3 py-2">
                            <input 
                                type="checkbox" 
                                id="saveAddress" 
                                className="w-5 h-5 accent-black cursor-pointer" 
                                checked={saveForFuture}
                                onChange={(e) => setSaveForFuture(e.target.checked)}
                            />
                            <label htmlFor="saveAddress" className="text-[10px] font-black uppercase tracking-widest cursor-pointer select-none">
                                Save this address to my Adidas profile
                            </label>
                        </div>

                        <button type="submit" className="md:col-span-2 bg-black text-white p-5 font-black uppercase tracking-widest mt-4 hover:bg-gray-900 transition-all flex justify-between items-center group">
                            Deliver to this address
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </form>
                </div>

                {/* RIGHT: CART RECAP */}
                <div className="w-full lg:w-1/3">
                    <div className="border border-black p-8 sticky top-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="font-black uppercase text-xs mb-6 border-b-2 border-black pb-2 tracking-widest">Order Summary</h2>
                        
                        <div className="max-h-80 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-black">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 border-b border-gray-100 pb-4">
                                    <div className="w-20 h-20 bg-gray-100 p-1">
                                        <img src={item.productImg} alt="shoe" className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="text-[10px]">
                                        <p className="font-black uppercase leading-tight text-xs">{item.name}</p>
                                        <p className="font-bold text-gray-500 mt-1 tracking-widest uppercase">Size: UK {item.size}</p>
                                        <p className="font-black mt-2 text-sm italic">₹{item.price?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t-2 border-black flex justify-between font-black text-xl italic uppercase tracking-tighter">
                            <span>Total</span>
                            <span>₹{total?.toLocaleString('en-IN') || "0"}.00</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddressPage;