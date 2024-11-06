'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {FloatingAnimation} from "@components/self/animations/floating-animation";
import ErrorMessage from "@components/self/error/error-message";

const PermissionDenied = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:p-0">
            {/* Icon Section */}
            <div className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
            <FloatingAnimation className="h-72 w-32 relative">
                    <div className="relative h-full w-32">
                        <div className="absolute w-32 h-32 bg-[#cccccc] rounded-full shadow-[0.85rem_0_0_rgba(153,153,153,1)] z-10">
                            <div className="absolute w-4 h-4 bg-[#f8f8f8] rounded-full shadow-[inset_0.5rem_0.1rem_0_rgba(153,153,153,1)] left-14 top-6"></div>
                            <motion.div
                                className="absolute w-3 h-3 bg-[#333333] rounded-full left-6 top-[4.5rem]"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <div className="absolute w-[0.15rem] h-[0.15rem] bg-[#f8f8f8] rounded-full left-[0.15rem] top-[0.15rem]"></div>
                                <div className="absolute w-1 h-1 bg-[#f8f8f8] rounded-full left-[0.35rem] top-[0.35rem]"></div>
                            </motion.div>
                            <motion.div
                                className="absolute w-3 h-3 bg-[#333333] rounded-full left-20 top-[4.5rem]"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <div className="absolute w-[0.15rem] h-[0.15rem] bg-[#f8f8f8] rounded-full left-[0.15rem] top-[0.15rem]"></div>
                                <div className="absolute w-1 h-1 bg-[#f8f8f8] rounded-full left-[0.35rem] top-[0.35rem]"></div>
                            </motion.div>
                            <div className="absolute w-5 h-5 border-2 border-[#333333] border-t-transparent border-r-transparent border-b-transparent rounded-full left-[3.5rem] top-[5.5rem] rotate-[70deg]"></div>
                        </div>
                        <div className="absolute w-12 h-36 bg-[#cccccc] shadow-[1rem_0_0_rgba(153,153,153,1)] top-28 left-10 z-10">
                            <div className="absolute w-[0.45rem] h-34 bg-[#999999] rounded-lg left-4 top-8 z-20"></div>
                            <div className="absolute w-5 h-[4.55rem] border-2 border-[#333333] border-b-transparent border-t-transparent border-l-transparent rounded-full left-[1.9rem] top-4 z-30"></div>
                            <div className="absolute w-5 h-[4.55rem] border-2 border-[#333333] border-b-transparent border-t-transparent border-r-transparent rounded-full left-[-0.5rem] top-4 z-30"></div>
                            <div className="absolute w-8 h-8 bg-[#cccccc] shadow-[0.5rem_-0.5rem_0_rgba(153,153,153,1)] rotate-45 top-8 left-8"></div>
                            <div className="absolute w-6 h-6 bg-[#cccccc] shadow-[0.5rem_-0.5rem_0_rgba(153,153,153,1)] rotate-45 top-[4.5rem] left-8"></div>
                            <div className="absolute w-7 h-7 bg-[#cccccc] shadow-[0.5rem_-0.5rem_0_rgba(153,153,153,1)] rotate-45 top-24 left-8"></div>
                        </div>
                        <div className="absolute w-12 h-8 bg-[#cccccc] rounded-b-[80%] shadow-[1rem_0_0_rgba(153,153,153,1)] top-64 left-10 z-20"></div>
                    </div>
            </FloatingAnimation>
            </div>
            {/* Access Denied Text Section */}
            <ErrorMessage
                errorCode="403"
                errorTitle="Acceso Denegado"
                errorMessage="Lo sentimos, no tiene permiso para acceder a esta página."
                buttonText="Volver al inicio"
                buttonLink="/"
            />
        </div>
    );
};

export default PermissionDenied;
