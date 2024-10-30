import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const withRole = (allowedRoles: string[]) => (Component: FC<{ children?: ReactNode }>) => {
    const RoleGuard: FC<{ children?: ReactNode }> = (props) => {
        const { user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            // Verifica si el rol del usuario no está permitido
            if (user && !allowedRoles.some(role => user.role.includes(role))) {
                router.push('/permission-denied');
            }
        }, [user, router]);

        // Renderiza el componente si el rol es permitido
        return user && allowedRoles.some(role => user.role.includes(role)) ? (
            <Component {...props} />
        ) : null;
    };

    return RoleGuard;
};

export default withRole;