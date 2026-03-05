import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Home/navbar";

const API_URL = "https://adiecom.onrender.com";

function AdminDashboard() {
    const [view, setView] = useState("overview"); // overview, inventory, add-product
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Form State for Add/Update
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
                axios.get(`${API_URL}/api/orders/all`) // Note: Ensure you have this route in backend
            ]);
            setProducts(prodRes.data);
            setOrders(orderRes.data);
        } catch (err) { console.error("Fetch Error:", err); }
        setLoading(false);
    };

    // --- SALES LOGIC ---
    const totalSales = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    // --- DELETE LOGIC ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure? This will remove the item from the shop permanently.")) {
            try {
                await axios.delete(`${API_URL}/api/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
                alert("Product Deleted");
            } catch (err) { alert("Delete Failed"); }
        }
    };

    // --- SUBMIT (ADD / UPDATE) LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = { ...productForm, price: Number(productForm.price), sizes: productForm.sizes.toString().split(",").map(s => Number(s.trim())) };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/api/products/${editingId}`, payload);
                alert("Product Updated!");
            } else {
                await axios.post(`${API_URL}/api/products`, payload);
                alert("Product Added!");
            }
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
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col md:flex-row">
            {/* SIDEBAR */}
            <div className="w-full md:w-64 bg-black text-white p-8 flex flex-col gap-8">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter border-b border-gray-800 pb-4">ADIDAS <br/>ADMIN</h2>
                <nav className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest">
                    <button onClick={() => setView("overview")} className={`text-left p-3 hover:bg-gray-900 transition-all ${view === 'overview' && 'bg-white text-black'}`}>Overview</button>
                    <button onClick={() => setView("inventory")} className={`text-left p-3 hover:bg-gray-900 transition-all ${view === 'inventory' && 'bg-white text-black'}`}>Inventory</button>
                    <button onClick={() => setView("add-product")} className={`text-left p-3 hover:bg-gray-900 transition-all ${view === 'add-product' && 'bg-white text-black'}`}>{editingId ? "Editing Product" : "Add New Product"}</button>
                </nav>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 p-6 md:p-12">
                
                {/* 1. OVERVIEW VIEW */}
                {view === "overview" && (
                    <div className="space-y-10 animate-fade-in">
                        <header className="border-b-4 border-black pb-4"><h1 className="text-4xl font-black uppercase italic tracking-tighter">Sales Dashboard</h1></header>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-black text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Total Revenue</p>
                                <h3 className="text-3xl font-black italic">₹{totalSales.toLocaleString('en-IN')}</h3>
                            </div>
                            <div className="bg-white border-2 border-black p-8">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Orders Placed</p>
                                <h3 className="text-3xl font-black italic">{orders.length}</h3>
                            </div>
                            <div className="bg-white border-2 border-black p-8">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Live Products</p>
                                <h3 className="text-3xl font-black italic">{products.length}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. INVENTORY VIEW (UPDATE / DELETE) */}
                {view === "inventory" && (
                    <div className="animate-fade-in">
                         <header className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
                            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Manage Stock</h1>
                            <button onClick={() => setView("add-product")} className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">+ New Item</button>
                         </header>

                         <div className="overflow-x-auto bg-white border-2 border-black">
                            <table className="w-full text-left text-[10px] uppercase font-bold tracking-widest">
                                <thead className="bg-gray-100 border-b-2 border-black">
                                    <tr>
                                        <th className="p-4">Item</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 flex items-center gap-3">
                                                <img src={p.image} className="w-10 h-10 object-cover" />
                                                <span className="truncate max-w-[150px]">{p.name}</span>
                                            </td>
                                            <td className="p-4 italic">₹{p.price}</td>
                                            <td className="p-4 opacity-50">{p.category}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button onClick={() => startEdit(p)} className="bg-black text-white px-3 py-1 hover:bg-gray-700 transition-all">Edit</button>
                                                <button onClick={() => handleDelete(p._id)} className="border-2 border-red-600 text-red-600 px-3 py-1 hover:bg-red-600 hover:text-white transition-all">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                    </div>
                )}

                {/* 3. ADD / EDIT PRODUCT VIEW */}
                {view === "add-product" && (
                    <div className="animate-fade-in max-w-2xl">
                         <header className="border-b-4 border-black pb-4 mb-8">
                            <h1 className="text-4xl font-black uppercase italic tracking-tighter">{editingId ? "Update Item" : "New Arrival"}</h1>
                         </header>

                         <form onSubmit={handleSubmit} className="grid gap-6">
                            <input required className="border-b-2 border-black p-3 outline-none uppercase font-black tracking-widest text-sm" placeholder="Name" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="number" className="border-b-2 border-black p-3 outline-none font-bold text-sm" placeholder="Price (INR)" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} />
                                <select className="border-b-2 border-black p-3 outline-none font-black uppercase text-xs" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Sportswear">Sportswear</option>
                                </select>
                            </div>
                            <input className="border-b-2 border-black p-3 outline-none text-xs" placeholder="Image URL" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} />
                            <input className="border-b-2 border-black p-3 outline-none text-xs" placeholder="Sizes (e.g. 7, 8, 9)" value={productForm.sizes} onChange={(e) => setProductForm({...productForm, sizes: e.target.value})} />
                            
                            <textarea className="border-2 border-black p-4 text-xs font-bold" rows="3" placeholder="Description..." value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} />
                            
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="new" className="accent-black" checked={productForm.isNewProduct} onChange={(e) => setProductForm({...productForm, isNewProduct: e.target.checked})} />
                                <label htmlFor="new" className="text-[10px] font-black uppercase tracking-widest">Mark as New Product</label>
                            </div>

                            <div className="flex gap-4">
                                <button type="submit" className="flex-1 bg-black text-white p-5 font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
                                    {editingId ? "Update Product" : "Save to Inventory"}
                                </button>
                                {editingId && <button onClick={() => {setEditingId(null); setView("inventory");}} className="px-8 border-2 border-black font-black uppercase text-[10px]">Cancel</button>}
                            </div>
                         </form>
                    </div>
                )}

            </div>
        </div>
    );
}

export default AdminDashboard;