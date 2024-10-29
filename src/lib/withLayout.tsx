import {ComponentType, FC} from "react";
import { usePathname } from "next/navigation";
import { routeLayouts } from "@/lib/routesConfig";

const withLayout = (PageComponent: ComponentType) => {
    const WithLayout: FC = (props) => {
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
