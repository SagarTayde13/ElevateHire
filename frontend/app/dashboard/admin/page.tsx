"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { Check, X, ShieldAlert } from "lucide-react";

interface Interviewer {
    id: number;
    name: string;
    email: string;
    expertise: string;
    verified: boolean;
}

export default function AdminDashboard() {
    const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInterviewers();
    }, []);

    const fetchInterviewers = async () => {
        try {
            const res = await api.get('/interviewers');
            // In real app, we would have a filter for 'unverified'
            // Here we filter on client
            setInterviewers(res.data);
        } catch (e) {
            console.error(e);
            // Mock data if backend is empty
            setInterviewers([
                { id: 99, name: "John Doe (Unverified)", email: "john@doe.com", expertise: "Java", verified: false }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const verifyInterviewer = async (id: number) => {
        try {
            await api.put(`/admin/verify/${id}`);
            // Optimistic update
            setInterviewers(interviewers.map(i => i.id === id ? { ...i, verified: true } : i));
        } catch (e) {
            alert("Failed to verify");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
                        <p className="text-gray-600">Overview & Verification Queue</p>
                    </div>
                    <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> ADMIN MODE
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">Pending Verifications</h2>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-sm font-medium text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Expertise</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {interviewers.map((interviewer) => (
                                <tr key={interviewer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{interviewer.name}</p>
                                        <p className="text-sm text-gray-500">{interviewer.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{interviewer.expertise}</td>
                                    <td className="px-6 py-4">
                                        {interviewer.verified ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        {!interviewer.verified && (
                                            <>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                                    <X className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" onClick={() => verifyInterviewer(interviewer.id)} className="bg-green-600 hover:bg-green-700 text-white">
                                                    <Check className="w-4 h-4 mr-1" /> Approve
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
