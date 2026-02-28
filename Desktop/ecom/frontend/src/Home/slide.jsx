import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import iphone from "../assets/hero__bdntboqignj6_xlarge.jpg";
function Hero() {
    return (
        <div className="mt-20 relative min-h-screen w-full bg-[#F9FAFB] flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
                {/* Text Content */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest">
                        <Star size={14} fill="currentColor" />
                        <span>New Collection 2026</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                        Upgrade Your <br />
                        <span className="text-blue-600">Lifestyle</span> Logic.
                    </h1>

                    <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                        Discover the next generation of premium essentials. Curated for those who value performance, style, and simplicity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group">
                            Shop Collection
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                            <ShoppingBag size={20} />
                            View Categories
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
                        <div>
                            <p className="text-2xl font-black text-slate-900">12k+</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Orders</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200"></div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">4.9/5</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative flex justify-center items-center lg:justify-end animate-in duration-1000 delay-200">
                    {/* Main Image Container */}
                    <div className="p-2 relative w-full max-w-lg aspect-square bg-black rounded-[3rem] rotate-3 overflow-hidden shadow-2xl transition-transform hover:rotate-0 duration-500">
                        <img 
                            src={iphone} 
                            alt="Featured Product"
                            className="w-full h-full object-center transition-transform duration-500 hover:scale-100"
                        />
                    </div>

                    {/* Floating Info Card */}
                    <div className="absolute -bottom-2 -left-6 md:left-0 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-[200px] animate-bounce-slow">
                        <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-slate-800">"The best Phone I've ever purchased!"</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">— Bharani Raja</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Hero;