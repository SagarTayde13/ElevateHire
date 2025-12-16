"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { Star, Briefcase, Clock } from "lucide-react";

interface Interviewer {
    id: number;
    name: string;
    expertise: string;
    hourlyRate: number;
}

export default function SearchPage() {
    const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
    const [loading, setLoading] = useState(true);
    const [candidateId, setCandidateId] = useState<number | null>(null);

    // Mock data for fallback because DB might be empty
    const mockInterviewers = [
        { id: 101, name: "Sarah Connor", expertise: "System Design, Java", hourlyRate: 150 },
        { id: 102, name: "Kyle Reese", expertise: "Frontend, React", hourlyRate: 120 },
        { id: 103, name: "T-800", expertise: "Security, Low-level Ops", hourlyRate: 200 },
    ];

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user && typeof user.id === 'number') {
                    setCandidateId(user.id);
                }
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }

        async function fetchInterviewers() {
            try {
                const res = await api.get('/interviewers');
                if (res.data.length > 0) {
                    setInterviewers(res.data);
                } else {
                    setInterviewers(mockInterviewers); // Fallback for demo
                }
            } catch (e) {
                console.error("Failed to fetch interviewers", e);
                setInterviewers(mockInterviewers); // Fallback for demo
            } finally {
                setLoading(false);
            }
        }
        fetchInterviewers();
    }, []);

    const handleBook = async (interviewerId: number) => {
        if (candidateId === null) {
            alert("Please log in to book a session.");
            return;
        }
        try {
            // Mock Booking
            await api.post('/bookings', {
                candidateId: candidateId,
                interviewerId,
                startTime: new Date().toISOString()
            });
            alert("Booking request sent!");
        } catch (e) {
            alert("Booking failed (Backend might be offline or ID invalid).");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find an Expert Interviewer</h2>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading experts...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviewers.map((interviewer) => (
                        <div key={interviewer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                                    {interviewer.name.charAt(0)}
                                </div>
                                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 5.0
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{interviewer.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{interviewer.expertise}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-1">
                                    <Briefcase className="w-4 h-4" /> Ex-Google
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> ${interviewer.hourlyRate}/hr
                                </div>
                            </div>

                            <Button onClick={() => handleBook(interviewer.id)} className="w-full">
                                Book Session
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
