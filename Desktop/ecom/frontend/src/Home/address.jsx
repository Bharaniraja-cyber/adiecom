import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Stepper from "./Stepper";
import axios from "axios";
import auth from "../login_firebse/firebase";


function AddressPage() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // States
    const [user, setUser] = useState(null); // Now used in the JSX below
    const [savedProfileAddress, setSavedProfileAddress] = useState(null);
    const [isManualEntry, setIsManualEntry] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [address, setAddress] = useState({
        fullName: "", phone: "", pin: "", street: "", city: "", stateName: ""
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Assigning user state
                try {
                    const res = await axios.get(`https://adiecom.onrender.com/api/users/${currentUser.uid}`);
                    if (res.data.savedAddress) {
                        setSavedProfileAddress(res.data.savedAddress);
                        setAddress(res.data.savedAddress);
                        setIsManualEntry(false);
                    } else {
                        setIsManualEntry(true);
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setIsManualEntry(true);
                }
            } else {
                navigate("/login");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const checkoutData = location.state || { cartItems: [], total: 0 };
    const { cartItems, total } = checkoutData;

    const handleInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleDeliverHere = (e) => {
        e.preventDefault();
        if (Object.values(address).some(val => val === "")) {
            alert("Please fill all fields");
            return;
        }
        navigate("/verify-purchase", {
            state: { ...checkoutData, address: address }
        });
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-tighter text-2xl">
            Authenticating...
        </div>
    );

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />
            <Stepper activeStep={0} />

            <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col lg:flex-row gap-12">
                
                <div className="flex-1">
                    {/* USE THE 'USER' VARIABLE HERE TO CLEAR ESLINT WARNING */}
                    <div className="mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            Logged in as: {user?.email}
                        </p>
                    </div>

                    <h1 className="text-3xl font-black uppercase italic mb-8 tracking-tighter">Shipping Details</h1>

                    {savedProfileAddress && (
                        <div className="flex gap-2 mb-8 border-b-2 border-black">
                            <button 
                                type="button"
                                onClick={() => { setIsManualEntry(false); setAddress(savedProfileAddress); }}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${!isManualEntry ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                            >
                                Use Saved Address
                            </button>
                            <button 
                                type="button"
                                onClick={() => { setIsManualEntry(true); setAddress({ fullName: "", phone: "", pin: "", street: "", city: "", stateName: "" }); }}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${isManualEntry ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                            >
                                New Address
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleDeliverHere} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required name="fullName" value={address.fullName} readOnly={!isManualEntry} placeholder="FULL NAME *" className={`border-2 border-black p-4 outline-none text-xs font-bold uppercase tracking-widest ${!isManualEntry ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`} onChange={handleInput} />
                            <input required name="phone" value={address.phone} readOnly={!isManualEntry} placeholder="PHONE NUMBER *" className={`border-2 border-black p-4 outline-none text-xs font-bold uppercase tracking-widest ${!isManualEntry ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`} onChange={handleInput} />
                            <input required name="pin" value={address.pin} readOnly={!isManualEntry} placeholder="PIN CODE *" className={`border-2 border-black p-4 outline-none text-xs font-bold uppercase tracking-widest ${!isManualEntry ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`} onChange={handleInput} />
                            <input required name="street" value={address.street} readOnly={!isManualEntry} placeholder="STREET / HOUSE NO *" className={`border-2 border-black p-4 outline-none md:col-span-2 text-xs font-bold uppercase tracking-widest ${!isManualEntry ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`} onChange={handleInput} />
                            <input required name="city" value={address.city} readOnly={!isManualEntry} placeholder="CITY *" className={`border-2 border-black p-4 outline-none text-xs font-bold uppercase tracking-widest ${!isManualEntry ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`} onChange={handleInput} />
                            <input required name="stateName" value={address.stateName} readOnly={!isManualEntry} placeholder="STATE *" className={`border-2 border-black p-4 outline-none text-xs font-bold uppercase tracking-widest ${!isManualEntry ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`} onChange={handleInput} />
                        </div>

                        <button type="submit" className="w-full bg-black text-white p-5 font-black uppercase tracking-widest mt-6 hover:bg-gray-900 transition-all flex justify-between items-center group">
                            {isManualEntry ? "Review Order & Pay" : "Deliver to Default Address"}
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </form>
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="border-4 border-black p-6 sticky top-24 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <h2 className="font-black uppercase text-xs mb-6 border-b-2 border-black pb-2">Bag Summary</h2>
                        <div className="max-h-60 overflow-y-auto space-y-4 pr-2 mb-6 scrollbar-hide">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <img src={item.productImg} alt="shoe" className="w-16 h-16 object-cover" />
                                    <div className="text-[10px]">
                                        <p className="font-black uppercase leading-tight">{item.name}</p>
                                        <p className="text-gray-500 font-bold uppercase tracking-tighter">Size: UK {item.size}</p>
                                        <p className="font-black mt-1 text-sm italic">₹{item.price?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-black pt-4 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>₹{total?.toLocaleString('en-IN')}.00</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between font-black text-xl italic uppercase pt-2">
                                <span>Total</span>
                                <span>₹{total?.toLocaleString('en-IN')}.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddressPage;