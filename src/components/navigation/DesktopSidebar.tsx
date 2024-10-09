import Link from "next/link";
import { Bell, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getSidebarLinks } from "@/lib/getSidebarLinks";

const DesktopSidebar = () => {
    const pathname = usePathname();
    const links = useMemo(() => getSidebarLinks(pathname), [pathname]);

    return (
        <div className="hidden md:flex flex-col w-64 bg-muted/40 border-r">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package2 className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                pathname === link.href ? "bg-muted text-primary" : ""
                            }`}
                        >
                            <link.icon/>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card>
                    <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                        <Button size="sm" className="w-full">Upgrade</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DesktopSidebar;
