import React from 'react';
import Link from 'next/link';
import { Undo2 } from 'lucide-react';
import { ScaleOnHover } from '@components/self/animations/scale-on-hover';
import { Button } from '@components/ui/button';

interface ErrorMessageProps {
    errorCode: string;
    errorTitle: string;
    errorMessage: string;
    buttonText: string;
    buttonLink: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorCode, errorTitle, errorMessage, buttonText, buttonLink }) => {
    return (
        <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-8xl font-bold mb-4">{errorCode}</h1>
            <h2 className="text-3xl font-bold mb-4">
                {errorTitle}
            </h2>
            <p className="mb-8 text-lg">
                {errorMessage}
            </p>
            <ScaleOnHover>
                <Button asChild size="lg" variant="outline"
                        className="text-lg sm:text-xl px-8 py-6 border-black text-black rounded-xl shadow-lg hover:bg-gray-100">
                    <Link href={buttonLink}>
                        <Undo2 className="mr-2 h-6 w-6 sm:h-8 sm:w-8"/> {buttonText}
                    </Link>
                </Button>
            </ScaleOnHover>
        </div>
    );
};

export default ErrorMessage;