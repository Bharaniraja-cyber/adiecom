import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hot1 from "../assets/hot1.avif";
import hot2 from "../assets/hot2.avif";
import axios from "axios";

function Moreproduct() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/api/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.log("Error fetching products:", err));
    }, [API_URL]);

    const handleViewDetails = (product) => {
        navigate("/adizero", { 
            state: { 
                name: product.name, 
                price: product.price, 
                productImg: product.image,
                category: product.category
            } 
        });
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="p-4 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-xl font-black uppercase tracking-wider">
                        All Products <span className="text-gray-400 text-lg">({filteredProducts.length})</span>
                    </h1>
                    
                    {/* Search Bar - Responsive width */}
                    <input 
                        type="text" 
                        placeholder="Search shoes (e.g. Samba, Running)..." 
                        className="border border-black p-2 w-full md:w-80 outline-none focus:bg-gray-50 text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Product Grid - Responsive Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-4">
                    {filteredProducts.map((product) => (
                        <div 
                            key={product._id} 
                            className="border border-transparent hover:border-black p-2 transition-all group cursor-pointer flex flex-col h-full"
                            onClick={() => handleViewDetails(product)}
                        >
                            <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-3 flex items-center justify-center">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                            
                            <div className="flex-grow">
                                <h3 className="uppercase text-sm font-bold tracking-tight leading-tight mb-1">{product.name}</h3>
                                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{product.category}</p>
                                <p className="font-black mt-2 text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                            </div>

                            <button 
                                className="w-full border border-black text-black mt-4 py-3 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all duration-300"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 italic">No products found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {/* WHAT'S HOT Section - Responsive Flex */}
            <div className="px-4 md:px-10 mt-10">
                <h3 className="font-black text-2xl tracking-tighter uppercase">WHAT'S HOT</h3>
                <div className="flex flex-col md:flex-row justify-center items-start gap-6 py-10">
                    <div className="w-full md:w-1/2 border hover:border-black transition-all p-0.5 cursor-pointer">
                        <div className="overflow-hidden ">
                            <img src={hot1} alt="Hot 1" className="w-full h-auto" />
                        </div>
                        <p className="mt-4 font-black uppercase text-sm tracking-tight">adidas Underwear</p>
                        <p className="font-medium text-xs text-gray-600 mt-1">Built for comfort. Made for movement</p>
                        <p className="inline-block underline text-xs font-black mt-2 uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white px-1">Shop now</p>
                    </div>
                    
                    <div className="w-full md:w-1/2 border hover:border-black cursor-pointer">
                        <div className="overflow-hidden">
                            <img src={hot2} alt="Hot 2" className="w-full h-auto" />
                        </div>
                        <p className="mt-4 font-black uppercase text-sm tracking-tight">adidas Shoes</p>
                        <p className="font-medium text-xs text-gray-600 mt-1">Built for comfort. Made for movement</p>
                        <p className="inline-block underline text-xs font-black mt-2 uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white px-1">Shop now</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Moreproduct;