"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, ShieldCheck, Menu, Receipt, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
        { name: "Portfolio", href: "/dashboard", icon: LayoutDashboard },
        { name: "Transactions", href: "/transactions", icon: Receipt },
    ];

    return (
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-primary text-primary-foreground p-1 rounded-lg">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">DIV Protocol</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                                pathname === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mr-2">
                        <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full text-xs font-semibold border border-green-500/20">
                            System Operational
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/profile">
                            <User className="w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="default" size="sm" asChild>
                        <Link href="/dashboard">Connect Wallet</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
