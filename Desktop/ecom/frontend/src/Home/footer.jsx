import { Instagram } from "lucide-react";

function Footer() {
    return (
        <div className="bg-black w-full border-t border-gray-800">
            {/* Main Links Grid */}
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-8 px-6 md:px-14 lg:px-20 py-10 text-white max-w-[1400px] mx-auto">
                
                {/* Products */}
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold my-2 text-sm uppercase">Products</h3>
                    <div className="flex flex-col text-[12px] gap-3 font-thin text-gray-300">
                        <a className="hover:underline" href="dashboard">Footwear</a>
                        <a className="hover:underline" href="dashboard">Clothing</a>
                        <a className="hover:underline" href="dashboard">Accessories</a>
                        <a className="hover:underline" href="dashboard">Outlet</a>
                        <a className="hover:underline" href="dashboard">New Arrivals</a>
                        <a className="hover:underline" href="dashboard">Flat 50% off!</a>
                    </div>
                </div>

                {/* Sports */}
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold my-2 text-sm uppercase">Sports</h3>
                    <div className="flex flex-col text-[12px] gap-3 font-thin text-gray-300">
                        <a className="hover:underline" href="dashboard">Running</a>
                        <a className="hover:underline" href="dashboard">Football</a>
                        <a className="hover:underline" href="dashboard">Cricket</a>
                        <a className="hover:underline" href="dashboard">Gym/Training</a>
                        <a className="hover:underline" href="dashboard">Badminton</a>
                        <a className="hover:underline" href="dashboard">Tennis</a>
                    </div>
                </div>

                {/* Collections */}
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold my-2 text-sm uppercase">Collections</h3>
                    <div className="flex flex-col text-[12px] gap-3 font-thin text-gray-300">
                        <a className="hover:underline" href="dashboard">Ultraboost</a>
                        <a className="hover:underline" href="dashboard">Superstar</a>
                        <a className="hover:underline" href="dashboard">NMD</a>
                        <a className="hover:underline" href="dashboard">Stan Smith</a>
                        <a className="hover:underline" href="dashboard">Sustainability</a>
                    </div>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold my-2 text-sm uppercase">Support</h3>
                    <div className="flex flex-col text-[12px] gap-3 font-thin text-gray-300">
                        <a className="hover:underline" href="dashboard">Help</a>
                        <a className="hover:underline" href="dashboard">Customer Services</a>
                        <a className="hover:underline" href="dashboard">Return & Exchanges</a>
                        <a className="hover:underline" href="dashboard">Shipping</a>
                        <a className="hover:underline" href="dashboard">Order Tracker</a>
                    </div>
                </div>

                {/* Company Info */}
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold my-2 text-sm uppercase">Company Info</h3>
                    <div className="flex flex-col text-[12px] gap-3 font-thin text-gray-300">
                        <a className="hover:underline" href="dashboard">About us</a>
                        <a className="hover:underline" href="dashboard">adidas stories</a>
                        <a className="hover:underline" href="dashboard">adidas apps</a>
                        <a className="hover:underline" href="dashboard">Press</a>
                        <a className="hover:underline" href="dashboard">Careers</a>                       
                    </div>
                </div>

                {/* Follow US */}
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold my-2 text-sm uppercase">Follow US</h3>
                    <Instagram className="text-white cursor-pointer hover:text-gray-400" size={30} />
                </div>
            </div>

            <hr className="border-gray-800 w-full" />

            {/* Bottom Legal Section */}
            <div className="p-6 md:p-10">
                <div className="text-white flex flex-wrap gap-4 justify-center text-[12px] md:text-xs font-light">
                    <a href="Cookiesettings" className="hover:underline">Cookie Settings</a>
                    <span className="hidden md:block text-gray-600">|</span>
                    <a href="privacy" className="hover:underline">Privacy Policies</a>
                    <span className="hidden md:block text-gray-600">|</span>
                    <a href="terms" className="hover:underline">Terms and Conditions</a>
                    <span className="hidden md:block text-gray-600">|</span>
                    <a href="cookies" className="hover:underline">Cookies</a>
                </div>
                <p className="text-center text-gray-500 text-[12px] mt-8 uppercase tracking-widest font-bold">
                    © 2026 adidas India Marketing Pvt. Ltd.
                </p>
            </div>
        </div>
    );
}

export default Footer;