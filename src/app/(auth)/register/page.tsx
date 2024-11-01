'use client'

import withLayout from "@/lib/withLayout";
import Register from "@components/self/views/auth/register";
import Image from "next/image";
import AnimatedWrapper from "@components/self/animations/enter_from_side";
import Portada from "../../../../public/images/Portada.png";

const RegisterPage = () => {
    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
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
            <div className="flex items-center justify-center py-12 lg:overflow-y-auto lg:max-h-screen">
                <AnimatedWrapper initialX={50} exitX={50} duration={1}>
                    <div className="w-full max-h-full lg:max-h-screen overflow-y-auto lg:overflow-visible mt-10">
                        <Register />
                    </div>
                </AnimatedWrapper>
            </div>
        </div>
    );
}

export default withLayout(RegisterPage);
