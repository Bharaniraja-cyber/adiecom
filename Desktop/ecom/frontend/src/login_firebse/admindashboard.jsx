import { useState } from "react";
import axios from "axios";
import Navbar from "../Home/navbar";
import Footer from "../Home/footer";

function AdminDashboard() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "Sportswear",
        image: "",
        sizes: "4, 5, 6, 7, 8, 9, 10, 11, 12", 
        isNewProduct: false
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const sizeArray = product.sizes.split(",").map(s => Number(s.trim()));

            const payload = {
                ...product,
                price: Number(product.price),
                sizes: sizeArray
            };

            await axios.post(`https://adiecom.onrender.com/api/products`, payload)
            alert("✅ Product added to database!");
            
            
            // Clear form
            setProduct({
                name: "",
                price: "",
                description: "",
                category: "Sportswear",
                image: "",
                sizes: "4, 5, 6, 7, 8, 9, 10, 11, 12",
                isNewProduct: false
            });
        } catch (err) {
            console.error(err);
            alert("❌ Error: " + (err.response?.data?.message || "Check console"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />
            
            <div className="max-w-4xl mx-auto p-6 md:p-12">
                <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-10">
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                        Admin <br /> <span className="text-gray-400">Inventory</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-right">
                        Manage your <br /> Store Products
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Basics */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1">Product Name *</label>
                            <input 
                                required
                                className="border-b-2 border-gray-200 focus:border-black p-2 outline-none uppercase font-bold text-sm transition-all"
                                type="text"
                                placeholder="e.g. ADIZERO BOSTON 13"
                                value={product.name}
                                onChange={(e) => setProduct({...product, name: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1">Price (INR) *</label>
                            <input 
                                required
                                className="border-b-2 border-gray-200 focus:border-black p-2 outline-none uppercase font-bold text-sm"
                                type="number"
                                placeholder="16999"
                                value={product.price}
                                onChange={(e) => setProduct({...product, price: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1">Category</label>
                            <select 
                                className="border-b-2 border-gray-200 focus:border-black p-2 outline-none uppercase font-bold text-sm bg-transparent"
                                value={product.category}
                                onChange={(e) => setProduct({...product, category: e.target.value})}
                            >
                                <option value="Shoes">Shoes</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Sportswear">Sportswear</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column: Media & Details */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1">Image URL *</label>
                            <input 
                                required
                                className="border-b-2 border-gray-200 focus:border-black p-2 outline-none text-xs font-medium"
                                type="text"
                                placeholder="Cloudinary or Imgur Link"
                                value={product.image}
                                onChange={(e) => setProduct({...product, image: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1">Sizes (Comma separated)</label>
                            <input 
                                className="border-b-2 border-gray-200 focus:border-black p-2 outline-none font-bold text-sm"
                                type="text"
                                value={product.sizes}
                                onChange={(e) => setProduct({...product, sizes: e.target.value})}
                            />
                        </div>

                        <div className="flex items-center gap-3 py-4">
                            <input 
                                type="checkbox" 
                                id="newProduct"
                                className="w-5 h-5 accent-black"
                                checked={product.isNewProduct}
                                onChange={(e) => setProduct({...product, isNewProduct: e.target.checked})}
                            />
                            <label htmlFor="newProduct" className="text-xs font-black uppercase tracking-widest cursor-pointer">
                                Mark as New Arrival ⚡️
                            </label>
                        </div>
                    </div>

                    {/* Description: Full Width */}
                    <div className="md:col-span-2 flex flex-col">
                        <label className="text-[10px] font-black uppercase tracking-widest mb-1">Product Description</label>
                        <textarea 
                            rows="3"
                            className="border-2 border-gray-100 focus:border-black p-4 outline-none text-sm font-medium"
                            placeholder="Tell more about the tech and comfort..."
                            value={product.description}
                            onChange={(e) => setProduct({...product, description: e.target.value})}
                        ></textarea>
                    </div>

                    <button 
                        disabled={loading}
                        className="md:col-span-2 bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex justify-between px-10 items-center disabled:bg-gray-400 group"
                    >
                        {loading ? "Syncing to Database..." : "Add Product to Shop"}
                        <span className="group-hover:translate-x-3 transition-transform">→</span>
                    </button>
                </form>

                {/* Preview Section */}
                {product.image && (
                    <div className="mt-20 border-t pt-10">
                        <p className="text-[10px] font-black uppercase mb-4 text-gray-400">Live Preview</p>
                        <div className="w-64 border border-black p-2">
                            <img src={product.image} alt="preview" className="w-full aspect-square object-cover mb-2" />
                            <p className="font-black uppercase text-sm">{product.name || "Product Name"}</p>
                            <p className="text-xs font-thin">₹{product.price || "0"}.00</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AdminDashboard;