'use client'

import { motion } from "framer-motion";
import {FloatingAnimation} from "@components/self/animations/floating-animation";
import React from "react";
import ErrorMessage from "@components/self/error/error-message";

const InternalServerError = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:p-0">
            {/* Icon Section */}
            <div className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
                <FloatingAnimation>
                    <svg viewBox="0 0 490 525" className="w-full h-auto">
                        <rect x="0" y="0" width="250" height="500" fill="#D9D9D9" rx="20"/>
                        <circle cx="20" cy="50" r="5" fill="#FFFFFF"/>
                        <circle cx="70" cy="50" r="5" fill="#FFFFFF"/>
                        <circle cx="120" cy="50" r="5" fill="#FFFFFF"/>
                        <circle cx="170" cy="50" r="5" fill="#FFFFFF"/>
                        <circle cx="220" cy="50" r="5" fill="#FFFFFF"/>
                        <circle cx="270" cy="50" r="5" fill="#FFFFFF"/>
                        <circle cx="20" cy="100" r="5" fill="#FFFFFF"/>
                        <circle cx="70" cy="100" r="5" fill="#FFFFFF"/>
                        <circle cx="120" cy="100" r="5" fill="#FFFFFF"/>
                        <circle cx="170" cy="100" r="5" fill="#FFFFFF"/>
                        <circle cx="220" cy="100" r="5" fill="#FFFFFF"/>
                        <circle cx="270" cy="100" r="5" fill="#FFFFFF"/>

                        <path fill="#7D7D7D"
                              d="M325 85c1 12-1 25-5 38-8 29-31 52-60 61-26 8-54 14-81 18-37 6-26-37-38-72l-4-4c0-17-9-33 4-37l33-4c9-2 9-21 11-30 1-7 3-14 5-21 8-28 40-42 68-29 18 9 36 19 50 32 13 11 16 31 17 48z"></path>
                        <path fill="none" stroke="#7D7D7D" stroke-width="24" stroke-linecap="round"
                              stroke-miterlimit="10"
                              d="M431 232c3 15 21 19 34 11 15-9 14-30 5-43-12-17-38-25-59-10-23 18-27 53-21 97s1 92-63 108"></path>
                        <path fill="#7D7D7D"
                              d="M284 158c35 40 63 85 86 133 24 52-6 113-62 123-2 0-4 1-6 1-53 9-101-33-101-87V188l83-30z"></path>
                        <path fill="#B0B0B0"
                              d="M95 152c-3-24 13-57 46-64l27-5c9-2 16-19 17-28l3-15 20-3c44 14 42 55 18 69 22 0 39 26 32 53-5 18-20 32-39 36-13 3-26 5-40 8-50 8-80-14-84-51z"></path>
                        <path fill="#7D7D7D" d="M367 392c-21 18-77 70-25 119h-61c-27-29-32-69 1-111l85-8z"></path>
                        <path fill="#7D7D7D" d="M289 399c-21 18-84 62-32 111h-61c-37-34-5-104 43-134l50 23z"></path>
                        <path fill="#B0B0B0" d="M185 56l3-15 20-3c25 8 35 25 35 41-12-18-49-29-58-23z"></path>
                        <path fill="#B0B0B0"
                              d="M190 34c8-28 40-42 68-29 18 9 36 19 50 32 10 9 14 23 16 37L187 46l3-12z"></path>
                        <path fill="#7D7D7D"
                              d="M292 168c0 0 0 201 0 241s20 98 91 85l-16-54c-22 12-31-17-31-37 0-20 0-108 0-137S325 200 292 168z"></path>
                        <path fill="#B0B0B0"
                              d="M284 79c11-9 23-17 35-23 25-12 54 7 59 38v1c4 27-13 51-36 53-12 1-25 1-37 0-22-1-39-27-32-52v-1c2-6 6-12 11-16z"></path>
                        <path fill="#7D7D7D" d="M201 203s0 84-95 140l22 42s67-25 89-86-16-96-16-96z"></path>
                        <path fill="#B0B0B0" d="M224 54l-67-14c-10-2-13-15-5-21s18-6 26 0l46 35z"></path>
                        <circle fill="#6B6B6B" cx="129" cy="161" r="12"></circle>
                        <g id="blinking-eyes">
                            <motion.circle
                                fill="#6B6B6B"
                                cx="129"
                                cy="161"
                                r="12"
                                animate={{scaleY: [1, 0.1, 1], transition: {repeat: Infinity, duration: 0.3, repeatDelay: 1.5, ease: "easeInOut"}}}
                            />
                            <motion.circle
                                fill="#6B6B6B"
                                cx="212"
                                cy="83"
                                r="7"
                                animate={{scaleY: [1, 0.1, 1], transition: {repeat: Infinity, duration: 0.3, repeatDelay: 1.5, ease: "easeInOut"}}}
                            />
                            <motion.circle
                                fill="#6B6B6B"
                                cx="189"
                                cy="79"
                                r="7"
                                animate={{scaleY: [1, 0.1, 1], transition: {repeat: Infinity, duration: 0.3, repeatDelay: 1.5, ease: "easeInOut"}}}
                            />
                        </g>
                        <path fill="#B0B0B0"
                              d="M383 493c11-3 19-8 25-13 7-10 4-16-5-20 8-9 2-22-8-18 1-1 1-2 1-3 3-9-9-15-15-8-3 4-8 7-13 9l15 53z"></path>
                        <path fill="#B0B0B0"
                              d="M252 510c5 6 0 15-9 15h-87c-10 0-16-8-13-15 5-12 21-19 36-16l73 16z"></path>
                        <ellipse transform="rotate(19.126 278.35 14.787)" fill="#B0B0B0" cx="278" cy="15" rx="9"
                                 ry="7"></ellipse>
                        <path fill="#B0B0B0"
                              d="M341 510c5 6 0 15-9 15h-87c-10 0-16-8-13-15 5-12 21-19 36-16l73 16z"></path>
                        <path fill="#B0B0B0" d="M357 90c-12-19-35-23-55-11-19 12-25 32-13 52"></path>
                        <path fill="#B0B0B0"
                              d="M110 427l21-9c5-2 7-8 5-13l-42-94c-3-6-9-9-15-6l-11 5c-6 2-9 9-7 15l36 97c2 5 8 7 13 5z"></path>
                        <path fill="#B0B0B0"
                              d="M37 278l41-17c11-4 22-5 33-1 5 2 10 4 14 6 6 3 4 11-3 11-9 0-18 1-26 3l2 12c1 6-2 11-8 13l-36 15c-5 2-10 1-14-2l-9-7-2 17c0 2-2 4-4 5l-3 1c-3 1-7 0-8-3L1 300c-1-3 0-7 4-9l4-2c2-1 5 0 7 1l12 10 1-11c0-5 3-9 8-11z"></path>
                        <path fill="#B0B0B0"
                              d="M103 373c10 2 14 10 8 19 6-1 10 4 10 9 0 3-3 6-6 7l-26 11c-2 1-5 1-8 0-6-3-7-9-2-16-7-1-13-9-6-17-8-1-12-8-8-15l3-3 23-11c9-4 19 8 12 16z"></path>
                        <ellipse transform="rotate(173.3 233.455 334.51)" fill="#B0B0B0" cx="234" cy="335" rx="32"
                                 ry="46"></ellipse>
                    </svg>
                </FloatingAnimation>
            </div>

            {/* Internal Server Error Text Section */}
            <ErrorMessage
                errorCode="500"
                errorTitle="Error Interno del Servidor"
                errorMessage="Lo sentimos, algo salió mal en nuestro servidor. Por favor, intenta nuevamente más tarde."
                buttonText="Volver al inicio"
                buttonLink="/"
            />

        </div>
    );
};

export default InternalServerError;
