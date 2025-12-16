"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { Briefcase, User, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                        E
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">ElevateHire</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/signup" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        For Candidates
                    </Link>
                    <Link href="/dashboard/candidate/search" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Find Experts
                    </Link>
                    <Link href="/resume-check" className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-80 transition-opacity font-bold">
                        Resume AI
                    </Link>
                    <Link href="/signup" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                        For Companies
                    </Link>
                    <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
                        Admin
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 bg-white space-y-4">
                    <Link href="/signup" className="block text-sm font-medium text-gray-600">For Candidates</Link>
                    <Link href="/signup" className="block text-sm font-medium text-gray-600">For Interviewers</Link>
                    <Link href="/signup" className="block text-sm font-medium text-gray-600">For Companies</Link>
                    <div className="pt-2 flex flex-col gap-2">
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full">Log In</Button>
                        </Link>
                        <Link href="/signup" className="w-full">
                            <Button className="w-full">Get Started</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
