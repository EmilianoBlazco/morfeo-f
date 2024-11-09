import React, {ReactNode} from 'react';
//import ProtectedRoute from "@/components/ProtectedRoute";
import DesktopSidebar from "@components/self/navigation/DesktopSidebar";
import Navbar from "@components/self/navigation/Navbar";

export default function AuthLayout({children}: { children: ReactNode }) {
    return (
        //<ProtectedRoute>
        <div className="flex h-screen">
            {/* Desktop Sidebar */}
            <aside className="md:flex">
                <DesktopSidebar/>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col">
                {/* Navbar */}
                <Navbar/>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto pr-10">
                    {children}
                </main>

            </div>
        </div>
        //</ProtectedRoute>
    );
}
