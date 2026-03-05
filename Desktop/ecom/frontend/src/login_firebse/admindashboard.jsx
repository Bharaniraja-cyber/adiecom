import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import auth from "./firebase";

const API_URL = "https://adiecom.onrender.com";

function AdminDashboard() {
    const navigate = useNavigate();
    const [view, setView] = useState("overview"); 
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [productForm, setProductForm] = useState({
        name: "", price: "", description: "", category: "Shoes", image: "", sizes: "7,8,9,10,11", isNewProduct: false
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, orderRes] = await Promise.all([
                axios.get(`${API_URL}/api/products`),
                axios.get(`${API_URL}/api/orders/all`)
            ]);
            setProducts(prodRes.data);
            setOrders(orderRes.data);
        } catch (err) { 
            console.error("Fetch Error:", err); 
        } finally {
            setLoading(false);
        }
    };

    const totalSales = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    const handleDelete = async (id) => {
        if (window.confirm("Permanently remove this product from inventory?")) {
            try {
                await axios.delete(`${API_URL}/api/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) { alert("Delete Failed"); }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = { 
            ...productForm, 
            price: Number(productForm.price), 
            sizes: productForm.sizes.toString().split(",").map(s => Number(s.trim())) 
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/api/products/${editingId}`, payload);
            } else {
                await axios.post(`${API_URL}/api/products`, payload);
            }
            // Reset Form
            setProductForm({ name: "", price: "", description: "", category: "Shoes", image: "", sizes: "7,8,9,10,11", isNewProduct: false });
            setEditingId(null);
            setView("inventory");
            fetchData();
        } catch (err) { alert("Operation Failed"); }
        setLoading(false);
    };

    const startEdit = (p) => {
        setProductForm({ ...p, sizes: p.sizes.join(",") });
        setEditingId(p._id);
        setView("add-product");
    };

    return (
        <div className="bg-[#F8F8F8] min-h-screen font-sans flex">
            
            {/* FIXED BLACK SIDEBAR */}
            <div className="w-64 bg-black text-white h-screen sticky top-0 left-0 p-8 flex flex-col justify-between shrink-0">
                <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-12 leading-none">
                        ADIDAS <br /> <span className="text-gray-500 text-xs tracking-widest">Admin</span>
                    </h2>
                    <nav className="flex flex-col gap-2">
                        {[
                            { id: 'overview', label: 'Dashboard' },
                            { id: 'inventory', label: 'Inventory' },
                            { id: 'add-product', label: editingId ? 'Editing...' : 'Add Product' }
                        ].map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`text-left px-4 py-3 text-[14px] font-black uppercase tracking-[0.2em] transition-all ${view === item.id ? 'bg-white text-black translate-x-2' : 'text-gray-400 hover:text-white hover:translate-x-1'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="flex flex-col gap-4 border-t border-gray-800 pt-6">
                    <button onClick={() => navigate("/")} className="text-left text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300">View Live Store</button>
                    <button onClick={() => auth.signOut().then(() => navigate("/login"))} className="text-left text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-400">Logout Session</button>
                </div>
            </div>

            {/* DASHBOARD */}
            <div className="flex-1 p-8 md:p-6">
                
                {/* 1. OVERVIEW VIEW */}
                {view === "overview" && (
                    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                        <header className="border-b-4 border-black pb-4"><h1 className="text-3xl font-black uppercase tracking-wider">Dashboard</h1></header>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-10 border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Revenue</p>
                                <h3 className="text-3xl text-red-600 font-black italic">₹{totalSales.toLocaleString('en-IN')}</h3>
                            </div>
                            <div className="bg-white p-10 border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Completed Orders</p>
                                <h3 className="text-3xl text-blue-600 font-black italic">{orders.length}</h3>
                            </div>
                            <div className="bg-white p-10 border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Live Products</p>
                                <h3 className="text-3xl text-green-600 font-black ">{products.length}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. INVENTORY VIEW */}
                {view === "inventory" && (
                    <div className=" shadow-lg ">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b-2 border-black">
                                <tr>
                                    <th className="p-5 text-[12px] font-black uppercase tracking-widest">Product Item</th>
                                    <th className="p-5 text-[12px] font-black uppercase tracking-widest">Price</th>
                                    <th className="p-5 text-right text-[12px] font-black uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {products.map(p => (
                                    <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-3 flex items-center gap-6">
                                            <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded shadow-sm grayscale group-hover:grayscale-0 transition-all" />
                                            <span className="text-xs font-black uppercase italic tracking-tighter">{p.name}</span>
                                        </td>
                                        <td className="p-6 text-sm font-black italic font-mono">₹{p.price.toLocaleString('en-IN')}</td>
                                        <td className="p-6 text-right space-x-6">
                                            <button onClick={() => startEdit(p)} className="bg-blue-600 text-[12px] border p-1 uppercase tracking-widest hover:underline text-white">Edit</button>
                                            <button onClick={() => handleDelete(p._id)} className="text-[12px] border p-1 font-black uppercase tracking-widest text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* 3. ADD / EDIT PRODUCT VIEW */}
                {view === "add-product" && (
                    <div className="max-w-2xl mx-auto bg-white p-12 border border-gray-100 shadow-2xl animate-in zoom-in-95">
                        <h2 className="text-3xl font-black uppercase italic mb-10 tracking-tighter border-b-4 border-black pb-4">
                            {editingId ? 'Modify Product' : 'Add New Item'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Product Name *</label>
                                <input required className="border-b-2 border-black py-2 outline-none font-black text-sm uppercase italic" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price (INR) *</label>
                                    <input required type="number" className="border-b-2 border-black py-2 outline-none font-black text-sm italic" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Category</label>
                                    <select className="border-b-2 border-black py-2 outline-none font-black text-[11px] uppercase bg-transparent" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Image URL *</label>
                                <input required className="border-b-2 border-black py-2 outline-none text-[11px] font-medium" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Available Sizes (CSV)</label>
                                <input className="border-b-2 border-black py-2 outline-none text-[11px] font-black" placeholder="7, 8, 9, 10" value={productForm.sizes} onChange={(e) => setProductForm({...productForm, sizes: e.target.value})} />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-all active:scale-95 disabled:bg-gray-400">
                                {loading ? 'Syncing...' : (editingId ? 'Save Changes' : 'Publish Product')}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;