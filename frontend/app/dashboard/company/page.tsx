"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Building2, UserPlus } from "lucide-react";
import api from "@/lib/api";

export default function CompanyDashboard() {
    const [candidates, setCandidates] = useState<any[]>([]);

    useEffect(() => {
        // In real app, we would fetch candidates
        setCandidates([
            { id: 1, name: "Alice Smith", email: "alice@example.com", skills: "React, Node.js" },
            { id: 2, name: "Bob Jones", email: "bob@example.com", skills: "Java, Spring" }
        ]);
    }, []);

    const assignInterviewer = async (candidateId: number) => {
        // Hardcoded interviewer ID 101 for demo
        try {
            await api.post('/company/assign', {
                candidateId,
                interviewerId: 101
            });
            alert(`Interviewer assigned to candidate ${candidateId} successfully!`);
        } catch (e) {
            alert("Assignment failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <Building2 className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Company Portal</h1>
                            <p className="text-gray-600">TechCorp Inc.</p>
                        </div>
                    </div>
                    <Button>Post New Job</Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.map((candidate) => (
                        <div key={candidate.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                    {candidate.name.charAt(0)}
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">OPEN</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{candidate.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{candidate.skills}</p>

                            <Button onClick={() => assignInterviewer(candidate.id)} variant="outline" className="w-full">
                                <UserPlus className="w-4 h-4 mr-2" /> Assign Interviewer
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
