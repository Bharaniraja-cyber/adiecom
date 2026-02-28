import Navbar from "../Home/navbar";
import Footer from "../Home/footer";
import img1 from "../assets/p1.avif";
import img2 from "../assets/adirun/Adizero_EVO_SL_Shoes_Green_JQ4444_01_00_standard.avif";
import img3 from "../assets/adirun/RESPONSE_2_RUNNING_SHOES_Red_KJ1752_01_00_standard.avif"
import img4 from "../assets/adirun/Adizero_EVO_SL_Shoes_Red_KK3677_01_00_standard.avif"
import Dash from "../Home/dash";
function Kids(){
    return(
        <div>
                <Navbar/>  
                <div className="px-10 mt-6 mb-3 flex gap-2 font-thin -tracking-wide text-xs underline">
                                        <a href="dashboard" className="hover:font-bold">Home</a>
                                        <p>/</p>
                                        <p className="hover:font-bold">Kids</p>
                                    </div>
                                    <h2 className="uppercase tracking-wide text-2xl font-bold px-10 mb-3">Kids Shoes</h2>
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
                <div className="px-10 flex mb-5 mt-4 flex-col justify-center items-center">
                    <h1 className="text-xl font-bold tracking-wider">KIDS’ CLOTHING & SHOES</h1>
                    <p className="font-thin text-sm md:w-2/3 text-justify">As a creator, you look for ways to excel and express yourself when and where you can, from reaching for that last rep to evolving your streetwear style. Log miles or tear down the baseline in kids' shoes with responsive cushioning. Rep an athletic style off the field in lifestyle apparel born of sport heritage. From athletes to streetwear enthusiasts, adidas kids’ clothing and shoes exist to let you go harder, dig deeper, and get the most out of yourself, from the pitch to the street to the road less traveled.</p>
                </div>
            <Footer/>

        </div>
    )
}

export default Kids;