import { useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { CheckCircle2, Package, MapPin, ArrowRight } from "lucide-react";

function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Catch the items and address from the payment handler if available
    const orderItems = location.state?.cartItems || [];
    const address = location.state?.address || {};
    const total = location.state?.totalAmount || 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans">
            
            
            <div className="max-w-4xl mx-auto py-20 px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="mb-6 p-4 bg-green-50 rounded-full">
                        <CheckCircle2 size={80} strokeWidth={1.5} className="text-green-600" />
                    </div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Payment Received</h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Order ID: #AD{Math.floor(Math.random() * 1000000)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black pt-12">
                    {/* LEFT: ORDER ITEMS */}
                    <div>
                        <h2 className="font-black uppercase text-sm mb-6 flex items-center gap-2">
                            <Package size={18} /> Your Items
                        </h2>
                        <div className="space-y-4">
                            {orderItems.length > 0 ? (
                                orderItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 border-b border-gray-100 pb-4">
                                        <img src={item.productImg} className="w-16 h-16 object-cover bg-gray-50" alt={item.name} />
                                        <div className="text-[10px] flex-1">
                                            <p className="font-black uppercase leading-tight">{item.name}</p>
                                            <p className="text-gray-400 mt-1">SIZE: UK {item.size} | QTY: {item.quantity}</p>
                                            <p className="font-bold mt-2 text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 italic">Processing order details...</p>
                            )}
                        </div>
                        <div className="mt-6 flex justify-between font-black uppercase text-xl border-t border-black pt-4">
                            <span>Paid</span>
                            <span>₹{total.toLocaleString('en-IN')}.00</span>
                        </div>
                    </div>

                    {/* RIGHT: SHIPPING & ACTIONS */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="font-black uppercase text-sm mb-6 flex items-center gap-2">
                                <MapPin size={18} /> Delivery Address
                            </h2>
                            <div className="bg-gray-50 p-6 space-y-1">
                                <p className="font-black uppercase text-sm">{address.fullName || "Valued Customer"}</p>
                                <p className="text-xs text-gray-600">{address.street}</p>
                                <p className="text-xs text-gray-600 uppercase">{address.city}, {address.stateName} {address.pin}</p>
                            </div>
                        </div>

                        <div className="mt-12 space-y-3">
                            <button 
                                onClick={() => navigate("/")}
                                className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-gray-800 transition-all text-xs flex items-center justify-center gap-2"
                            >
                                Continue Shopping <ArrowRight size={16} />
                            </button>
                            <button 
                                onClick={() => window.print()}
                                className="w-full border-2 border-black text-black py-5 font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-xs"
                            >
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
}

export default Success;