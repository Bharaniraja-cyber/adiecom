import img2 from "../assets/Adizero_EVO_SL_Shoes_Black_JP7147_HM4.avif"
import { useNavigate } from "react-router-dom";

function ProdeuctRightNow(){
    const navigate = useNavigate();
    
    // Updated function to handle dynamic data passing
    function handleNavigate(name, price, img) {
        navigate("/adizero", { 
            state: { 
                name: name, 
                price: price, 
                productImg: img,
                category: "Sportswear" 
            } 
        });
    }

    return(
    <div className="px-4 md:px-12 py-6 md:py-10">
        <div className="flex justify-between mb-4 items-center">
            <h1 className="font-bold tracking-wider text-lg md:text-xl uppercase">Popular Right Now</h1>
            <a href="shoes" className="underline font-bold text-xs md:text-sm uppercase tracking-widest">Shop Now</a>
        </div>

        {/* Categories Bar - Scrollable on Mobile */}
        <div className="flex gap-3 md:gap-5 font-thin text-[14px] md:text-[16px] tracking-wide overflow-x-auto no-scrollbar pb-2">
            <button className="p-1 px-3 whitespace-nowrap hover:bg-black hover:text-white border border-black transition-colors">WALK</button>
            <button className="p-1 px-3 whitespace-nowrap hover:bg-black hover:text-white border border-black transition-colors">RUNNING</button>
            <button className="p-1 px-3 whitespace-nowrap hover:bg-black hover:text-white border border-black transition-colors">FOOTBALL</button>
            <button className="p-1 px-3 whitespace-nowrap hover:bg-black hover:text-white border border-black transition-colors">BEST SELLERS ⚡️</button>
            <button className="p-1 px-3 whitespace-nowrap hover:bg-black hover:text-white border border-black transition-colors">MATCHING SETS</button>            
        </div>

        {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-3 mt-5">
            
            {/* Shoe 1 */}
            <div className="mt-3 cursor-pointer p-0.5 hover:border hover:border-black transition-all group" 
                 onClick={() => handleNavigate("ADIDAS ADIZERO BOSTON 13 SHOES", 16999, img2)}>
                <img src={img2} className="w-full aspect-square object-cover" alt="shoes" />
                <p className="text-[14px] md:text-[16px] mb-1 mt-1 font-bold">₹16 999.00</p>
                <p className="tracking-wide font-thin text-[14px] md:text-[16px] uppercase leading-tight">ADIDAS ADIZERO BOSTON 13 SHOES</p>
                <span className="text-[10px] md:text-xs font-thin text-gray-500">Sportswear</span>
            </div>

            {/* Shoe 2 */}
            <div className="mt-3 cursor-pointer p-0.5 hover:border hover:border-black transition-all group" 
                 onClick={() => handleNavigate("CLOUDFOAM CUXXION RAPIDFIT SHOES", 7999, "https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084178/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard_wruahq.avif")}>
                <img src={"https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084178/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard_wruahq.avif"} className="w-full aspect-square object-cover" alt="shoes" />
                <p className="text-[14px] md:text-[16px] mb-1 mt-1 font-bold">₹7 999.00</p>
                <p className="tracking-wide font-thin text-[14px] md:text-[16px] uppercase leading-tight">CLOUDFOAM CUXXION RAPIDFIT SHOES</p>
                <span className="text-[10px] md:text-xs font-thin text-gray-500">Sportswear</span>
            </div>

            {/* Shoe 3 */}
            <div className="mt-3 cursor-pointer p-0.5 hover:border hover:border-black transition-all group" 
                 onClick={() => handleNavigate("CLOUDFOAM CUXXION RAPIDFIT SHOES", 7999, "https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084178/Adizero_EVO_SL_Shoes_Green_JQ4444_01_00_standard_im1uj3.avif")}>
                <img src={"https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084178/Adizero_EVO_SL_Shoes_Green_JQ4444_01_00_standard_im1uj3.avif"} className="w-full aspect-square object-cover" alt="shoes" />
                <p className="text-[14px] md:text-[16px] mb-1 mt-1 font-bold">₹7 999.00</p>
                <p className="tracking-wide font-thin text-[14px] md:text-[16px] uppercase leading-tight">CLOUDFOAM CUXXION RAPIDFIT SHOES</p>
                <span className="text-[10px] md:text-xs font-thin text-gray-500">Sportswear</span>
            </div>

             {/* Shoe 4 */}
             <div className="mt-3 cursor-pointer p-0.5 hover:border hover:border-black transition-all group" 
                 onClick={() => handleNavigate("ADIDAS ADIZERO BOSTON 13 SHOES", 16999, "https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084179/RESPONSE_RUNNER_2_Shoes_Green_KJ1742_01_00_standard_dvykay.avif")}>
                <img src={"https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084179/RESPONSE_RUNNER_2_Shoes_Green_KJ1742_01_00_standard_dvykay.avif"} className="w-full aspect-square object-cover" alt="shoes" />
                <p className="text-[14px] md:text-[16px] mb-1 mt-1 font-bold">₹16 999.00</p>
                <p className="tracking-wide font-thin text-[14px] md:text-[16px] uppercase leading-tight">ADIDAS ADIZERO BOSTON 13 SHOES</p>
                <span className="text-[10px] md:text-xs font-thin text-gray-500">Sportswear</span>
            </div>

            {/* Shoe 5 */}
            <div className="mt-3 cursor-pointer p-0.5 hover:border hover:border-black transition-all group" 
                 onClick={() => handleNavigate("CLOUDFOAM CUXXION RAPIDFIT SHOES", 9999, "https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084179/RESPONSE_RUNNER_2_Shoes_Blue_KJ1744_01_00_standard_dzllpn.avif")}>
                <img src={"https://res.cloudinary.com/dtbyc5onq/image/upload/v1772084179/RESPONSE_RUNNER_2_Shoes_Blue_KJ1744_01_00_standard_dzllpn.avif"} className="w-full aspect-square object-cover" alt="shoes" />
                <p className="text-[14px] md:text-[16px] mb-1 mt-1 font-bold">₹9 999.00</p>
                <p className="tracking-wide font-thin text-[14px] md:text-[16px] uppercase leading-tight">CLOUDFOAM CUXXION RAPIDFIT SHOES</p>
                <span className="text-[10px] md:text-xs font-thin text-gray-500">Sportswear</span>
            </div>

        </div>
    </div>)
}

export default ProdeuctRightNow;