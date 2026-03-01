import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Added useEffect and useState
import auth from "../login_firebse/firebase";

const BuyNow = ({ amount, cartItems, address }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // 1. Properly track the Firebase user state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handlePayment = async () => {
        // 2. Safety Check: If user isn't logged in, don't proceed
        if (!user) {
            alert("Please login to complete your purchase.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(`https://adiecom.onrender.com/create-order`, {
                amount: amount, 
            });

            const order = response.data;

            const options = {
                key: "rzp_test_SFassawvaA5QvQ", 
                amount: order.amount,
                currency: order.currency,
                name: "ADIDAS STORE",
                description: "MERN STACK PURCHASE",
                image: "https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084178/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard_wruahq.avif",
                order_id: order.id,
                
                handler: async function (response) {
                    const paymentData = {
                        uid: user.uid, // Use the state-tracked user UID
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        cartItems: cartItems, 
                        address: address,     
                        totalAmount: amount,
                    };

                    try {
                        const res = await axios.post(`https://adiecom.onrender.com/api/orders`, paymentData);

                        if (res.status === 201) {
                            localStorage.removeItem("cart"); 
                            navigate("/success", { state: paymentData });
                        }
                    } catch (err) {
                        console.error("Order storage failed:", err);
                        alert("Payment successful, but we encountered an error saving your order.");
                    }
                },
                prefill: {
                    name: address.fullName || "Customer",
                    contact: address.phone || "0000000000",
                },
                notes: {
                    address: `${address.street}, ${address.city}, ${address.pin}`,
                },
                theme: {
                    color: "#000000",
                },
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response){
                alert("Payment Failed: " + response.error.description);
            });

            rzp.open();

        } catch (error) {
            console.error("Backend Connection Error:", error);
            alert("Payment failed to start");
        }
    };

    return (
        <button 
            onClick={handlePayment}
            className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-green-600 transition-all text-sm border-2 border-transparent active:scale-95"
        >
            Confirm & Pay ₹{amount?.toLocaleString('en-IN')}.00
        </button>
    );
};

export default BuyNow;