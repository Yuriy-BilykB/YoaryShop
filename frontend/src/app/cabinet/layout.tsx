"use client";
import {useState} from "react";
import CabinetSideBar from "@/components/CabinetComponents/CabinetSideBar";
import {Menu} from "lucide-react";

export default function CabinetLayout({children}: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed z-20 top-4 left-4 p-2 rounded-md bg-white shadow-md text-gray-700"
                >
                    <Menu size={24}/>
                </button>

                {/* Sidebar */}
                <aside
                    className={`fixed lg:static z-10 h-full lg:h-auto transition-all duration-300 bg-white shadow-lg 
                        ${isSidebarOpen ? 'left-0' : '-left-64'} 
                        w-64 lg:w-64 py-6 px-4 overflow-y-auto`}
                >
                    <CabinetSideBar/>
                </aside>

                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 z-5 bg-black bg-opacity-30"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <main
                    className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
                    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-5 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}