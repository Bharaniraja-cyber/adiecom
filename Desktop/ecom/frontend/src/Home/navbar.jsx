import { ShoppingCart, User2Icon, HeartIcon, SearchIcon, Menu, X, LogOut, Package, ShieldCheck } from "lucide-react";
import adidas from "../assets/689347.jpg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import auth from "../login_firebse/firebase";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    
    // UI States
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currUser) => {
            setUser(currUser);
            if (currUser) {
                // Check if user is Admin from MongoDB
                try {
                    const res = await axios.get(`${API_URL}/api/users/${currUser.uid}`);
                    setIsAdmin(res.data.role === 'admin');
                } catch (err) {
                    setIsAdmin(false);
                }
            }
        });

        // Fetch products for Search suggestions
        axios.get(`${API_URL}/api/products`)
            .then(res => setAllProducts(res.data))
            .catch(err => console.log(err));

        // Cart Sync Logic
        const syncCart = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const total = cart.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(total);
        };

        syncCart();
        window.addEventListener("cartUpdate", syncCart);
        window.addEventListener("storage", syncCart);

        // Close profile dropdown on outside click
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            unsubscribe();
            window.removeEventListener("cartUpdate", syncCart);
            window.removeEventListener("storage", syncCart);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [API_URL]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value.trim() === "") {
            setSuggestions([]);
        } else {
            const filtered = allProducts.filter(p => 
                p.name.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        }
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate("/");
            setIsProfileOpen(false);
        });
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="flex justify-between p-2 border-b-2 border-gray-300 items-center md:items-end">
                
                {/* LEFT: MOBILE MENU & LOGO */}
                <div className="flex items-center gap-2">
                    <button className="lg:hidden p-1" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <img 
                        className="w-16 md:w-20 cursor-pointer object-cover" 
                        onClick={() => navigate("/dashboard")} 
                        src={adidas} 
                        alt="logo" 
                    />
                </div>

                {/* CENTER: NAV LINKS (Desktop Only) */}
                <div className="hidden lg:flex text-[15px] font-black tracking-widest text-black items-end space-x-6 uppercase">
                    <a href="/shoes" className="hover:border-b-2 border-black">Shoes</a>
                    <a href="/men" className="hover:border-b-2 border-black">Men</a>
                    <a href="/women" className="hover:border-b-2 border-black">Women</a>
                    <a href="/kids" className="hover:border-b-2 border-black">Kids</a>
                    <a href="/outlet" className="text-red-600">Outlet</a>
                </div>

                {/* RIGHT: SEARCH & ICONS (Stacked Design) */}
                <div className="flex flex-col gap-1 md:gap-2 items-end">
                    
                    {/* Top Row: Mini Links */}
                    <div className="hidden sm:flex px-4 gap-4 text-[11px] font-bold uppercase tracking-tighter text-gray-500 items-center">
                        {isAdmin && (
                            <p onClick={() => navigate("/admin")} className="text-red-600 flex items-center gap-1 cursor-pointer">
                                <ShieldCheck size={12}/> Admin Panel
                            </p>
                        )}
                        <p className="hover:text-black cursor-pointer">help</p>
                        <p className="hover:text-black cursor-pointer">wishlist</p>
                        <p className="text-black tracking-wide">
                            {user ? `Hi, ${user.displayName || user.email.split('@')[0]}` : "Welcome"}
                        </p>
                    </div>

                    {/* Bottom Row: Search Bar & Utility Icons */}
                    <div className="flex gap-2 md:gap-3 items-center pr-2">
                        
                        {/* Search Input */}
                        <div className="flex items-center relative group">
                             <input 
                                className="bg-gray-100 w-28 h-8 md:w-44 px-3 py-2 outline-none text-[10px] md:text-xs font-bold uppercase transition-all focus:bg-gray-200" 
                                type="text" 
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                             />
                            <SearchIcon className="w-8 h-8 bg-gray-100 p-2 text-gray-600" />

                            {/* Search Suggestions Dropdown */}
                            {suggestions.length > 0 && (
                                <div className="absolute top-full right-0 w-64 bg-white border border-black shadow-2xl z-[100] mt-1">
                                    {suggestions.map((p) => (
                                        <div 
                                            key={p._id} 
                                            onClick={() => { navigate("/adizero", { state: { ...p, productImg: p.image } }); setSearchTerm(""); setSuggestions([]); }}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-100 border-b cursor-pointer transition-colors"
                                        >
                                            <img src={p.image} className="w-10 h-10 object-cover" alt="product" />
                                            <p className="text-[10px] font-black uppercase truncate">{p.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown Container */}
                        <div className="relative" ref={dropdownRef}>
                            <div className="cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                {user?.photoURL ? (
                                    <img src={user.photoURL} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-black object-cover" alt="profile" />
                                ) : (
                                    <User2Icon className="w-6 h-6"/>
                                )}
                            </div>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-3 w-60 bg-white border border-black shadow-2xl z-[110] p-5">
                                    <div className="border-b pb-3 mb-3">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Your Account</p>
                                        <p className="text-xs font-black uppercase mt-1 truncate">{user?.email}</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div onClick={() => { navigate("/orders"); setIsProfileOpen(false); }} className="flex items-center gap-3 cursor-pointer text-[11px] font-bold uppercase hover:underline">
                                            <Package size={16} /> My Orders
                                        </div>
                                        {isAdmin && (
                                            <div onClick={() => { navigate("/admin"); setIsProfileOpen(false); }} className="flex items-center gap-3 cursor-pointer text-[11px] font-bold uppercase text-red-600">
                                                <ShieldCheck size={16} /> Admin Settings
                                            </div>
                                        )}
                                        <button onClick={handleLogout} className="flex items-center gap-3 text-left text-red-600 text-[11px] font-black uppercase border-t pt-3">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <HeartIcon className="hidden sm:block w-6 h-6 cursor-pointer" />
                        
                        {/* Cart Icon with Live Counter */}
                        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MOBILE SIDEBAR MENU --- */}
            <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute top-0 left-0 w-3/4 h-full bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex justify-between items-center p-5 border-b">
                        <img src={adidas} className="w-16" alt="logo" />
                        <X size={24} onClick={() => setIsMenuOpen(false)} className="cursor-pointer" />
                    </div>
                    <div className="p-6 flex flex-col gap-6 text-xl font-black uppercase italic italic-tracking-tighter">
                        <a href="/shoes" onClick={() => setIsMenuOpen(false)}>Shoes</a>
                        <a href="/men" onClick={() => setIsMenuOpen(false)}>Men</a>
                        <a href="/women" onClick={() => setIsMenuOpen(false)}>Women</a>
                        <a href="/kids" onClick={() => setIsMenuOpen(false)}>Kids</a>
                        <a href="/outlet" onClick={() => setIsMenuOpen(false)} className="text-red-600">Outlet</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;