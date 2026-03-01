import { useEffect, useState } from "react";
import axios from "axios";
import auth from "../login_firebse/firebase";
import Navbar from "./navbar";
import Footer from "./footer";


function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                fetchOrders(currentUser.uid);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchOrders = async (uid) => {
        try {
            const res = await axios.get(`https://adiecom.onrender.com/api/orders/user/${uid}`);
            console.log("Fetched Orders:", res.data);
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black tracking-tighter text-xl uppercase italic">
            Loading your history...
        </div>
    );

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />
            
            <div className="max-w-6xl mx-auto p-6 md:p-12">
                <header className="mb-12 border-b-4 border-black pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">My Orders</h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-2">History & Tracking</p>
                    </div>
                    <span className="text-xs font-black uppercase bg-black text-white px-3 py-1 mb-1">
                        {orders.length} Total
                    </span>
                </header>

                {orders.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-gray-200">
                        <p className="font-black uppercase tracking-widest text-gray-400">No orders found yet.</p>
                        <a href="/" className="inline-block mt-4 underline font-black uppercase text-xs">Start Shopping</a>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order._id} className="border border-black group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="bg-black text-white p-4 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                                        <div>
                                            <p className="text-gray-400 mb-1">Order Date</p>
                                            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 mb-1">Total Amount</p>
                                            <p>₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-gray-400 mb-1">Order ID</p>
                                            <p className="text-gray-300">#{order.orderId?.slice(-8) || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                                        Status: {order.status || "Processing"}
                                    </div>
                                </div>

                                <div className="p-6 grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center border-b border-gray-100 pb-4 last:border-0">
                                                <div className="w-20 h-20 bg-gray-50 flex-shrink-0">
                                                    <img src={item.productImg} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                                </div>
                                                <div className="text-[10px]">
                                                    <p className="font-black uppercase text-sm leading-tight">{item.name}</p>
                                                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest">Size: UK {item.size} | Qty: {item.quantity || 1}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-50 p-6 text-[10px] uppercase font-bold tracking-widest space-y-2 border-l-0 md:border-l border-gray-200">
                                        <p className="text-gray-400 mb-4 font-black text-xs">Delivered To:</p>
                                        <p className="text-black font-black">{order.address?.fullName}</p>
                                        <p>{order.address?.street}</p>
                                        <p>{order.address?.city}, {order.address?.stateName} - {order.address?.pin}</p>
                                        <p className="mt-4 pt-4 border-t border-gray-200">Phone: {order.address?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Orders;