"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Briefcase } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [role, setRole] = useState<'CANDIDATE' | 'INTERVIEWER'>('CANDIDATE');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/auth/register', { ...formData, role });
            localStorage.setItem('user', JSON.stringify(response.data));

            if (role === 'CANDIDATE') router.push('/dashboard/candidate');
            else router.push('/dashboard/interviewer');
        } catch (err: any) {
            console.error("Signup failed:", err);
            const msg = err.response?.data?.message || err.message || "Unknown error";
            alert(`Signup Failed: ${JSON.stringify(msg)}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>

                {/* Role Selection */}
                <div className="flex gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => setRole('CANDIDATE')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'CANDIDATE' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                        <User className="w-6 h-6" />
                        <span className="font-medium">Candidate</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('INTERVIEWER')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'INTERVIEWER' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                        <Briefcase className="w-6 h-6" />
                        <span className="font-medium">Interviewer</span>
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
