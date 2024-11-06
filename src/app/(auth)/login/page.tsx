'use client'

import Image from "next/image";
import Login from "@components/self/views/auth/login";
import AnimatedWrapper from "@components/self/animations/enter_from_side";
import Portada from "../../../../public/images/Portada.png";

const LoginPage = () => {
    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center py-12 lg:overflow-hidden lg:max-h-screen">
                <AnimatedWrapper initialX={50} exitX={50} duration={1}>
                    <div className="w-full max-h-full lg:max-h-screen overflow-y-auto mt-10 lg:overflow-y-auto">
                        <Login/>
                    </div>
                </AnimatedWrapper>
            </div>
            <AnimatedWrapper initialX={-50} exitX={50} duration={1}>
                <div className="relative hidden bg-muted lg:block h-full">
                    <Image
                        src={Portada}
                        alt="Imagen de portada"
                        layout="fill"
                        objectFit="cover"
                        className="dark:brightness-[0.2] dark:grayscale"
                    />
                    <h1 className="absolute top-24 left-1/2 transform -translate-x-1/2 text-gray-500 font-bold text-4xl md:text-6xl lg:text-7xl whitespace-nowrap">
                        Morfeo S. A.
                    </h1>
                </div>
            </AnimatedWrapper>
        </div>
    );
}

export default LoginPage;
