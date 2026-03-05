import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Stepper from "./Stepper";

function AddressPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    
    // Destructure checkout data from state (passed from Cart/Dashboard)
    const { cartItems = [], total = 0 } = state || {};

    const [address, setAddress] = useState({
        fullName: "", phone: "", pin: "", street: "", city: "", stateName: ""
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        // Safety redirect if someone visits the URL directly without items
        if (cartItems.length === 0) {
            navigate("/");
        }
    }, [cartItems, navigate]);

    const handleInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleDeliver = (e) => {
        e.preventDefault();
        // Check if all fields are filled
        if (Object.values(address).some(val => val === "")) {
            alert("Please provide complete shipping details");
            return;
        }
        // Move to verification/payment stage
        navigate("/verify-purchase", {
            state: { cartItems, total, address }
        });
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white">
            <Navbar />
            <Stepper activeStep={0} />

            <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col lg:flex-row gap-12">
                
                {/* LEFT: ADDRESS FORM */}
                <div className="flex-1">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Shipping</h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Enter your delivery destination</p>
                    </header>

                    <form onSubmit={handleDeliver} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(address).map((key) => (
                                <input 
                                    key={key}
                                    required 
                                    name={key} 
                                    value={address[key]} 
                                    placeholder={`${key.replace(/([A-Z])/g, ' $1').toUpperCase()} *`} 
                                    className={`border-2 border-black p-4 outline-none text-xs font-bold uppercase tracking-widest focus:bg-gray-50 transition-colors ${key === 'street' ? 'md:col-span-2' : ''}`} 
                                    onChange={handleInput} 
                                />
                            ))}
                        </div>

                        <button type="submit" className="w-full bg-black text-white p-5 font-black uppercase tracking-[0.3em] mt-6 hover:bg-gray-900 transition-all flex justify-between items-center group">
                            Continue to Payment
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </form>
                </div>

                {/* RIGHT: ORDER SUMMARY */}
                <div className="w-full lg:w-1/3">
                    <div className="border-4 border-black p-8 sticky top-24 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <h2 className="font-black uppercase text-xs mb-6 border-b-2 border-black pb-2 italic">Summary</h2>
                        
                        <div className="max-h-64 overflow-y-auto space-y-4 mb-6 scrollbar-hide">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                                        <img src={item.productImg} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="text-[10px] font-black uppercase">
                                        <p className="leading-tight">{item.name}</p>
                                        <p className="text-gray-500 mt-1 tracking-tighter">Size: UK {item.size} | Qty: {item.quantity || 1}</p>
                                        <p className="mt-1 text-sm italic">₹{item.price?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-black pt-4 space-y-2 text-[10px] font-bold uppercase tracking-widest">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{total?.toLocaleString('en-IN')}.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span className="text-green-600 font-black">Free</span>
                            </div>
                            <div className="flex justify-between font-black text-2xl italic pt-4 border-t border-gray-100 mt-2">
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