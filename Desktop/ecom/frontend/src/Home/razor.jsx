import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyNow = ({ amount, cartItems, address }) => {
    const navigate = useNavigate();
    const handlePayment = async () => {
        try {
            // 1. Create the order on your Node.js backend (server.js)
            // This hits your app.post('/create-order') route
            const response = await axios.post(`${API_URL}/create-order`, {
                amount: amount, // Total calculated from the Cart
            });

            const order = response.data;

            const options = {
                key: "rzp_test_SFassawvaA5QvQ", // Your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "ADIDAS STORE",
                description: "MERN STACK PURCHASE",
                image: "https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084178/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard_wruahq.avif",
                order_id: order.id,
                
                // 2. This handler runs AFTER the user pays successfully in the modal
                handler: async function (response) {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        cartItems: cartItems, // Includes quantity and size
                        address: address,     // Shipping details from AddressPage
                        totalAmount: amount,
                    };

                    try {
                        // 3. Save the order details into your MongoDB (app.post('/api/orders'))
                        const res = await axios.post(`https://adiecom.onrender.com/api/orders`, paymentData);
                        console.log("My Backend URL is:", API_URL);

                        if (res.status === 201) {
                            // 4. Clear the local storage bag
                            localStorage.removeItem("cart"); 
                            
                            // 5. Navigate to Success page and PASS the order data for display
                            navigate("/success", { state: paymentData });
                        }
                    } catch (err) {
                        console.error("Order storage failed:", err);
                        alert("Payment successful, but we encountered an error saving your order to the database.");
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
                    color: "#000000", // Solid black theme
                },
            };

            const rzp = new window.Razorpay(options);
            
            // Catch modal closure or payment failure
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