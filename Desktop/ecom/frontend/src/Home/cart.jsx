import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { Trash2, Plus, Minus } from "lucide-react";
import auth from "../login_firebse/firebase";
function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    const handleCheckout = () => {
    const user = auth.currentUser;

    if (!user) {
    navigate("/login", { state: { from: "/address", cartItems, total: subtotal } });
    }else {
        alert("Please login to make purchase.");
        navigate("/login");
    }
};

    const updateQuantity = (index, delta) => {
        const updated = [...cartItems];
        updated[index].quantity = Math.max(1, updated[index].quantity + delta);
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const removeItem = (index) => {
        const updated = cartItems.filter((_, i) => i !== index);
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6 md:p-12 flex flex-col lg:flex-row gap-16">
                <div className="flex-1">
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-10">Your Bag</h1>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-400">Bag is empty</p>
                    ) : (
                        <div className="space-y-8">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-6 border-b pb-8">
                                    <img src={item.productImg} className="w-32 h-32 object-cover bg-gray-100" alt={item.name} />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between">
                                            <h2 className="font-black uppercase text-lg">{item.name}</h2>
                                            <p className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Size: UK {item.size}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <button onClick={() => updateQuantity(index, -1)} className="border p-1"><Minus size={14}/></button>
                                            <span className="font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(index, 1)} className="border p-1"><Plus size={14}/></button>
                                            <button onClick={() => removeItem(index)} className="ml-auto text-gray-400"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-[400px]">
                    <div className="bg-gray-50 p-8 sticky top-24">
                        <h2 className="font-black uppercase text-2xl mb-8">Summary</h2>
                        <div className="flex justify-between font-black text-2xl border-t border-black pt-6 mb-10">
                            <span>Total</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}.00</span>
                        </div>
                        <button 
                            disabled={cartItems.length === 0}
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-200"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Cart;