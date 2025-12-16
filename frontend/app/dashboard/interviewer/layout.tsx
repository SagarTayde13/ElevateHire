"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, DollarSign, Users, LogOut, User } from "lucide-react";

export default function InterviewerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard/interviewer", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/interviewer/schedule", label: "My Schedule", icon: Calendar },
        { href: "/dashboard/interviewer/requests", label: "Booking Requests", icon: Users },
        { href: "/dashboard/interviewer/earnings", label: "Earnings", icon: DollarSign },
        { href: "/dashboard/interviewer/profile", label: "My Profile", icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b">
                    <span className="text-xl font-bold text-purple-600">ElevateHire</span>
                    <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">EXPERT</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-purple-50 text-purple-700"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold text-gray-800">Interviewer Portal</h1>
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                        SC
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
