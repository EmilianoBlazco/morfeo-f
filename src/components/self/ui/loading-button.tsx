import {ReactNode} from "react";
import {Loader2} from "lucide-react";
import {Button} from "@components/ui/button";

//FC -> Functional Component practicamente me permite decir que va a ser un componente que define props, return y un children
//ReactNode -> Es un tipo de dato que puede ser cualquier cosa que pueda ser renderizado por React (componente, numero, string, etc)
interface LoadingButtonProps {
    isLoading: boolean;
    loadingText: string;
    children: ReactNode;
    icon?: ReactNode;
    className?: string;

    [key: string]: any; // para recibir cualquier otra prop como `type`, `onClick`, etc.
}

const LoadingButton = (
    {
        isLoading,
        loadingText = "Procesando...",
        children,
        icon = <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true"/>,
        className = "",
        ...props
    }: LoadingButtonProps
) => {
    return (
        <Button
            disabled={isLoading}
            className={`"w-full" ${className}`}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    {icon}
                    <span>{loadingText}</span>
                </div>
            ) : (children
            )}
        </Button>
    );
}

export default LoadingButton;