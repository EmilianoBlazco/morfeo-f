import {ComponentType, FC, ReactNode} from "react";
import { usePathname } from "next/navigation";
import { routeLayouts } from "@/lib/routesConfig";

const withLayout = (PageComponent: ComponentType<{ children?: ReactNode }>) => {
    const WithLayout: FC<{ children?: ReactNode }> = (props) => {
        const pathname = usePathname();
        const LayoutComponent = routeLayouts[pathname as keyof typeof routeLayouts] || routeLayouts["default"];

        return (
            <LayoutComponent>
                <PageComponent {...props} />
            </LayoutComponent>
        );
    };

    WithLayout.displayName = `WithLayout(${PageComponent.displayName || PageComponent.name || 'Component'})`;

    return WithLayout;
};

export default withLayout;
