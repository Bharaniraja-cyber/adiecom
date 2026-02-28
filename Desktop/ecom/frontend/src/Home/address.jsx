import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Stepper from "./Stepper";

function AddressPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. UPDATED DATA CATCHING
    // We now look for 'cartItems' and 'total' from the Cart page
    const checkoutData = location.state || { cartItems: [], total: 0 };
    const { cartItems, total } = checkoutData;

    const [address, setAddress] = useState({
        fullName: "", phone: "", pin: "", street: "", city: "", stateName: ""
    });

    const handleInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleDeliverHere = (e) => {
        e.preventDefault();
        if (Object.values(address).some(val => val === "")) {
            alert("Please fill all fields");
            return;
        }

        // Forwarding the whole cart + address to the final verify page
        navigate("/verify-purchase", {
            state: { ...checkoutData, address: address }
        });
    };

    // Safety check: if cart is empty, send them back
    if (cartItems.length === 0 && !location.state?.price) {
        return <div className="p-20 text-center uppercase font-black">Your bag is empty. <button onClick={() => navigate("/")} className="underline">Shop Now</button></div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <Stepper activeStep={0} />

            <div className="max-w-6xl mx-auto p-10 flex flex-col lg:flex-row gap-12">
                
                {/* LEFT: ADDRESS FORM */}
                <div className="flex-1">
                    <h1 className="text-2xl font-black uppercase mb-8">Shipping Address</h1>
                    <form onSubmit={handleDeliverHere} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="fullName" placeholder="Full Name" className="border border-black p-3 outline-none" onChange={handleInput} />
                        <input required name="phone" placeholder="Phone Number" className="border border-black p-3 outline-none" onChange={handleInput} />
                        <input required name="pin" placeholder="PIN Code" className="border border-black p-3 outline-none" onChange={handleInput} />
                        <input required name="street" placeholder="Street/Landmark" className="border border-black p-3 outline-none md:col-span-2" onChange={handleInput} />
                        <input required name="city" placeholder="City" className="border border-black p-3 outline-none" onChange={handleInput} />
                        <input required name="stateName" placeholder="State" className="border border-black p-3 outline-none" onChange={handleInput} />
                        
                        <button type="submit" className="md:col-span-2 bg-black text-white p-4 font-black uppercase mt-4 hover:bg-gray-800">
                            Deliver to this address
                        </button>
                    </form>
                </div>

                {/* RIGHT: CART RECAP (Fixed the toLocaleString error here) */}
                <div className="w-full lg:w-1/3">
                    <div className="border border-black p-6 sticky top-24">
                        <h2 className="font-black uppercase text-sm mb-4 border-b border-black pb-2">Order Summary</h2>
                        
                        <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-3 border-b border-gray-100 pb-2">
                                    <img src={item.productImg} alt="shoe" className="w-16 h-16 object-cover bg-gray-50" />
                                    <div className="text-[10px]">
                                        <p className="font-bold uppercase leading-tight">{item.name}</p>
                                        <p className="text-gray-500">Size: UK {item.size}</p>
                                        <p className="font-bold mt-1">₹{item.price?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 pt-4 border-t border-black flex justify-between font-black text-lg italic uppercase">
                            <span>Total</span>
                            {/* The safe check: total?.toLocaleString() */}
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