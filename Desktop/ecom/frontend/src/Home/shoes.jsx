import Navbar from "./navbar";
import Footer from "./footer";
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/p1.avif";
import img2 from "../assets/adirun/Adizero_EVO_SL_Shoes_Green_JQ4444_01_00_standard.avif";
import img3 from "../assets/adirun/RESPONSE_2_RUNNING_SHOES_Red_KJ1752_01_00_standard.avif"
import img4 from "../assets/adirun/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard.avif"
function Shoes(){

    const [products, setProducts] = useState([]);
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

     const filteredProducts = products
    
    return(
        <div>
            <Navbar/>

            <div>
                    <div className="px-10 mt-6 mb-3 flex gap-2 font-thin -tracking-wide text-xs underline">
                        <a href="dashboard" className="hover:font-bold">Home</a>
                        <p>/</p>
                        <p className="hover:font-bold">Shoes</p>
                    </div>
                    <h2 className="uppercase tracking-wide text-2xl font-bold px-10 mb-3">Shoes</h2>
                     <div className="px-16 gap-1 grid grid-cols-2  md:flex  md:px-10  "> 
                        <div className="w-32">
                            <img src={img1} alt="shoes" className="w-32 h-28 object-cover" />
                            <p className="text-center underline font-medium tracking-wider p-2 border">Originals</p>
                        </div>
                        <div className="w-32">
                            <img src={img2} alt="shoes" className="w-32 h-28 object-cover" />
                            <p className="text-center underline font-medium tracking-wider p-2 border">Sportswear</p>
                        </div>
                        <div className="w-32">
                            <img src={img3} alt="shoes" className="w-32 h-28 object-cover" />
                            <p className="text-center underline font-medium tracking-wider p-2 border">Running</p>
                        </div>
                        <div className="w-32">
                            <img src={img4} alt="shoes" className="w-32 h-28 object-cover" />
                            <p className="text-center underline font-medium tracking-wider p-2 border">Othersports</p>
                        </div>
                        

                     </div>
            </div>


            
            <div>
                   <div className="grid gap-2 p-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-4 ">
                    {filteredProducts.map((product) => (
                        <div 
                            key={product._id} 
                            className="border shadow-sm hover:border-black p-2 transition-all  group cursor-pointer flex flex-col h-full"
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
                                <p className="text-xs text-gray-500 font-medium mt-2">{product.sizes.length} colors available</p>                                
                            </div>

                        
                        </div>
                    ))}
                </div>
                <div className="p-8 text-justify border-t   border-black">
                    <h1 className="font-bold uppercase text-2xl tracking-wider">Quality sports shoes</h1>
                    <p className="font-thin text-sm mt-2">As the most important piece of equipment you’ll wear during exercise, finding the right pair of sports shoes will make or break your workout. High-quality sports shoes not only help with your performance, they also prevent injuries from getting the better of you. With the huge range of adidas sports shoes, we can equip you with the right footwear for your chosen activity. From tennis to winter sports and everything in between, our sports shoes are designed for durability and comfort.</p>
                    <h1 className="font-bold mt-5 text-2xl tracking-wide">Designed to support</h1>
                    <p className="text-sm font-thin mt-2">Featuring superior cushioning from Adiprene, your shoe takes the impact when you exercise rather than your foot. Offering flexibility in the right places, our sports shoes will provide your feet with the stability they need. If you’re looking for traction on the golf course, our collection of golf shoes will deliver grip. When you need night-time visibility during your runs, reflective detailing will ensure you’re seen in low light. Whether you’re keeping fit indoors or outdoors, technology like an OrthoLite® sockliner supports your feet and protects your sports shoes from bacteria growth and odours, as well as being moisture-wicking.</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Shoes;