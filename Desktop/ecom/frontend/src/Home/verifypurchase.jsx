import { useLocation} from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Stepper from "./Stepper";
import BuyNow from "./razor";

function VerifyPurchase() {
    const { state } = useLocation();

    const checkoutData = state || { cartItems: [], total: 0, address: {} };
    const { cartItems, total, address } = checkoutData;

    if (!address?.fullName || cartItems.length === 0) {
        return <div className="p-20 text-center font-bold uppercase">Missing checkout data.</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <Stepper activeStep={1} />
            <div className="max-w-7xl mx-auto p-6 md:p-12 flex flex-col lg:flex-row gap-16">
                <div className="flex-1 space-y-12">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Review & Confirm</h1>
                    
                    <div className="border border-black p-8">
                        <h3 className="font-bold uppercase text-[14px] mb-4 text-gray-500">Shipping To:</h3>
                        <p className="font-black text-xl uppercase">{address.fullName}</p>
                        <p className="text-sm">{address.street}, {address.city}, {address.pin}</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-bold uppercase text-[12px] text-gray-500">Items:</h3>
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex gap-6 py-4 border-b">
                                <img src={item.productImg} className="w-20 h-20 object-cover" alt={item.name} />
                                <div className="flex-1 flex justify-between">
                                    <div>
                                        <h2 className="font-black uppercase text-sm">{item.name}</h2>
                                        <p className="text-[10px] font-bold text-gray-500">UK {item.size} x {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-[400px]">
                    <div className="border border-black text-black p-8 sticky top-24">
                        <h2 className="font-black uppercase text-2xl mb-8 border-b border-gray-800 pb-4">Total</h2>
                        <div className="flex justify-between text-xl font-black uppercase mb-10">
                            <span>Amount</span>
                            <span>₹{total.toLocaleString('en-IN')}.00</span>
                        </div>
                        {/* Razorpay Component */}
                        <BuyNow amount={total} cartItems={cartItems} address={address} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default VerifyPurchase;