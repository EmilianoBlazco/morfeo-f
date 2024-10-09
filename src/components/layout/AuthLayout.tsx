import React, { ReactNode } from 'react';
//import ProtectedRoute from "@/components/ProtectedRoute";
import DesktopSidebar from "@/components/navigation/DesktopSidebar";
//import MobileSidebar from "@/components/structure/MobileSidebar";
import Navbar from "@/components/navigation/Navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        //<ProtectedRoute>
            <div className="flex h-screen">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex">
                    <DesktopSidebar />
                </aside>

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col">
                    {/* Navbar */}
                    <Navbar />

                    {/* Mobile Sidebar Trigger */}
                    {/*<div className="md:hidden">
                        <MobileSidebar />
                    </div>*/}

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="border-t p-4">
                        Auth Footer
                    </footer>
                </div>
            </div>
        //</ProtectedRoute>
    );
}
