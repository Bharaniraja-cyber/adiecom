import Navbar from "../Home/navbar";
import Footer from "../Home/footer";
import img1 from "../assets/p1.avif";
import img2 from "../assets/adirun/Adizero_EVO_SL_Shoes_Green_JQ4444_01_00_standard.avif";
import img3 from "../assets/adirun/RESPONSE_2_RUNNING_SHOES_Red_KJ1752_01_00_standard.avif"
import img4 from "../assets/adirun/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard.avif"
import Dash from "../Home/dash";
function Women(){
    return(
        <div>
                <Navbar/>  
                <div className="px-10 mt-6 mb-3 flex gap-2 font-thin -tracking-wide text-xs underline">
                                        <a href="dashboard" className="hover:font-bold">Home</a>
                                        <p>/</p>
                                        <p className="hover:font-bold">Women</p>
                                    </div>
                                    <h2 className="uppercase tracking-wide text-2xl font-bold px-10 mb-3">Women Shoes</h2>
                                     <div className="px-16 mb-3 gap-1 grid grid-cols-2  md:flex  md:px-10  "> 
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
                <Dash />
                <Footer/>
        </div>
    )
}

export default Women;