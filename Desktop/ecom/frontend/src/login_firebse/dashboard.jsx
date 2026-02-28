import Navbar from "../Home/navbar";
import ProdeuctRightNow from "../Home/products";
import Moreproduct from "../Home/product";
import Footer1 from "../Home/foot1";
import Footer from "../Home/footer";
import { useState, useEffect } from "react";

function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    // Ensure page starts at top when dashboard loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
            <Navbar onSearch={setSearchQuery} />
            
            <main className="flex-grow">
                {!searchQuery && (
                    <section className="animate-fade-in">
                        <ProdeuctRightNow searchQuery={searchQuery} />
                    </section>
                )}

                <section className={`${searchQuery ? 'pt-10' : ''}`}>
                    <Moreproduct searchQuery={searchQuery} />
                </section>
            </main>

            <Footer1 />
            <Footer />
        </div>
    );
}

export default Dashboard;