import { useEffect, useState } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { HeartIcon } from "lucide-react";

import img1 from "../assets/Adizero_EVO_SL_Shoes_Black_JP7147_HM1.avif";
import videoFallback from "../assets/Adizero_EVO_SL_Shoes_Black_JP7147_video.webm";

function Adizero() {
    const location = useLocation();
    const navigate = useNavigate();

    const productData = location.state || {
        name: "ADIZERO BOSTON 13 SHOES",
        price: 16999,
        productImg: img1,
        category: "Men - Running"
    };

    const [isFav, setIsFav] = useState(false);
    const [sizes] = useState([4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productData.name]);

const [showSuccess, setShowSuccess] = useState(false);

function handleAddToCart() {
    if (!selectedSize) {
        alert("Please select a size first");
        return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItemIndex = existingCart.findIndex(
        (item) => item.name === productData.name && item.size === selectedSize
    );

    if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
    } else {
        existingCart.push({
            id: productData._id || Date.now(),
            name: productData.name,
            price: productData.price,
            size: selectedSize,
            productImg: productData.productImg,
            category: productData.category,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    window.dispatchEvent(new Event("cartUpdate"));

    setShowSuccess(true);
    
    setTimeout(() => {
        setShowSuccess(false);
    }, 3000);
}
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            
            <div className="flex flex-col lg:flex-row w-full">
                
                
                <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-100">
                    <div className="p-10 md:p-0 lg:p-0 overflow-hidden  aspect-square bg-white">
                        <img 
                            src={productData.productImg} 
                            className="hover:scale-110 md:w-full lg:w-full h-full object-cover transition-transform duration-700" 
                            alt={productData.name} 
                        />
                    </div>
                    
                   <div className="hidden md:flex overflow-hidden aspect-square bg-white items-center justify-center">
                        {productData.name === "ADIZERO BOSTON 13 SHOES" ? (
                            <video 
                                src={videoFallback} 
                                autoPlay 
                                muted 
                                loop 
                                className="w-full h-full object-cover"
                            ></video>
                        ) : (
                            <img 
                                src={productData.productImg} 
                                className="w-full h-full object-cover opacity-60 grayscale" 
                                alt="detail" 
                            />
                        )}
                    </div>
                    <div className="hidden md:block p-2 px-10 border-t border-gray-100 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                            Free Delivery for members
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            30 Days easy return policy
                        </p>
                    </div>
                </div>

               
                <div className="w-full lg:w-[35%] flex flex-col gap-3 p-5 md:p-8 lg:p-5 tracking-wider lg:sticky lg:top-20 h-fit bg-white">
                    <div>
                        <p className="text-[10px] md:text-xs font-bold uppercase text-gray-500 tracking-widest">
                            {productData.category}
                        </p>
                    </div>
                    
                    <h1 className="font-black text-xl md:text-xl lg:text-xl uppercase tracking-wider">
                        {productData.name}
                    </h1>
                    
                    <p className="text-xl font-black">
                        ₹{productData.price.toLocaleString('en-IN')}.00
                    </p>
                    
                    <p className="text-[10px] text-gray-400 font-medium uppercase">
                        MRP inclusive of all taxes
                    </p>

                    <div>
                        <h2 className="text-sm mb-1 font-black uppercase">Select Size (UK)</h2>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {sizes.map((s) => (
                                <button
                                    key={s}
                                    className={`border py-3 text-xs font-bold transition-all duration-300 ${
                                        selectedSize === s 
                                        ? "bg-black text-white border-black" 
                                        : "bg-gray-200 text-black border-gray-200 hover:border-black"
                                    }`}
                                    onClick={() => setSelectedSize(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs mt-4 underline font-bold cursor-pointer uppercase italic">
                        Size guide
                    </p>

                    <div className="flex flex-row sm:flex-row items-stretch sm:items-center gap-2">
                        <button 
                            onClick={handleAddToCart} 
                            className="bg-black text-white p-4 flex-1 font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
                        >
                            Add to Bag
                        </button>
                        
                        <button 
                            onClick={() => setIsFav(!isFav)} 
                            className={`p-4 border border-black flex items-center justify-center transition-colors ${
                                isFav ? "bg-red-50" : "bg-white"
                            }`}
                        >
                            <HeartIcon className={`w-6 h-6 ${isFav ? "text-red-500 fill-red-500" : "text-black"}`} />
                        </button>
                    </div>

                     <div className="md:hidden p-2 px-10 border-t border-gray-100 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                            Free Delivery for members
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            30 Days easy return policy
                        </p>
                    </div>

                          {showSuccess && (
                        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
                            <div className="bg-black text-white px-6 py-2 flex items-center gap-4  border border-white/20">
                                <div className="bg-green-500 rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Success</p>
                                    <p className="text-[11px] font-bold uppercase text-gray-300">Article added to bag</p>
                                </div>
                                <button 
                                    onClick={() => navigate("/cart")}
                                    className="ml-4 border-l border-gray-700 pl-4 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-colors"
                                >
                                    View Bag →
                                </button>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
      
            
            <Footer />
        </div>
    );
}

export default Adizero;