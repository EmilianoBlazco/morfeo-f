'use client'

import Image from "next/image";
import Login from "@components/self/views/auth/login";
import AnimatedWrapper from "@components/self/animations/enter_from_side";

const LoginPage = () => {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <AnimatedWrapper initialX={-50} exitX={50} duration={1}>
                    <Login />
                </AnimatedWrapper>
            </div>
            <AnimatedWrapper initialX={50} exitX={50} duration={1}>
                <div className="flex items-center justify-center relative">
                    <Image
                        src="/images/Portada.png"
                        alt="Imagen de portada"
                        width={1920}
                        height={1080}
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />

                    <h1 className="absolute top-24 left-1/2 transform -translate-x-1/2 text-gray-500 font-bold text-4xl md:text-6xl lg:text-7xl whitespace-nowrap">
                        Morfeo S. A.
                    </h1>
                </div>
            </AnimatedWrapper>
        </div>
    )
        ;
}

export default LoginPage;