import {ComponentType, ReactNode} from "react";
import { usePathname } from "next/navigation";
import { routeLayouts } from "@/lib/routesConfig";

const withLayout = (PageComponent: ComponentType<{ children?: ReactNode }>) => {
    const WithLayout = (props: { children?: ReactNode }) => {
        const pathname = usePathname();
        const LayoutComponent = routeLayouts[pathname as keyof typeof routeLayouts] || routeLayouts["default"];

        return (
            <LayoutComponent>
                <PageComponent {...props} />
            </LayoutComponent>
        );
    };

    // Definir el displayName para el componente HOC
    WithLayout.displayName = `WithLayout(${PageComponent.displayName || PageComponent.name || 'Component'})`;

    return WithLayout;
};

export default withLayout;
