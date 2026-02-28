import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Dash(){
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5002/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log("Error fetching products:", err));
    }, []);

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

     const filteredProducts = products
    return(
        <div className="bg-white">
    {/* Product Grid Section */}
    <div className="px-4 md:px-10 lg:px-12 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
            {filteredProducts.map((product) => (
                <div 
                    key={product._id} 
                    className="relative group cursor-pointer flex flex-col h-full transition-all"
                    onClick={() => handleViewDetails(product)}
                >
                    {/* Image Container */}
                    <div className="relative w-full aspect-square overflow-hidden bg-[#eceff1] mb-4">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                        />
                        {/* Subtle Badge for New/Promo */}
                        <div className="absolute bottom-2 left-0 bg-white px-2 py-1 text-[10px] font-black tracking-tighter uppercase">
                            ₹{product.price.toLocaleString('en-IN')}
                        </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex flex-col flex-grow px-1">
                        <h3 className="uppercase text-[13px] font-bold tracking-tight leading-none group-hover:underline decoration-1 underline-offset-4">
                            {product.name}
                        </h3>
                        <p className="text-gray-400 text-[11px] mt-1 font-medium uppercase tracking-widest">
                            {product.category}
                        </p>
                        
                        <div className="mt-auto pt-3">
                            <p className="text-[11px] text-gray-500 font-bold uppercase italic tracking-tighter">
                                {product.sizes?.length || 0} Sizes Available
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* Content / SEO Section - Redesigned with 'Adidas Slant' Vibes */}
    <div className="mt-16 bg-[#f5f5f5] py-16 px-6 md:px-20 lg:px-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Column 1 */}
            <div className="space-y-4">
                <h2 className="font-black italic uppercase text-3xl md:text-4xl tracking-tighter leading-none border-l-8 border-black pl-4">
                    Quality <br /> sports shoes
                </h2>
                <p className="font-medium text-[13px] leading-relaxed text-gray-700 max-w-md">
                    As the most important piece of equipment you’ll wear during exercise, finding the right pair 
                    of sports shoes will make or break your workout. High-quality sports shoes not only help 
                    with your performance, they also prevent injuries.
                </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
                <h2 className="font-black italic uppercase text-3xl md:text-4xl tracking-tighter leading-none border-l-8 border-black pl-4">
                    Designed <br /> to support
                </h2>
                <p className="font-medium text-[13px] leading-relaxed text-gray-700 max-w-md">
                    Featuring superior cushioning from Adiprene, your shoe takes the impact rather than your foot. 
                    Technology like an OrthoLite® sockliner supports your feet and protects from bacteria growth, 
                    ensuring you stay dry and comfortable.
                </p>
            </div>
        </div>
    </div>
</div>
    )

}

export default Dash;