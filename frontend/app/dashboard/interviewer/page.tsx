"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Booking {
    id: number;
    candidateName: string;
    startTime: string;
    status: string;
}

export default function InterviewerDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        // In a real app we would fetch this using the logged-in ID
        // For now we will mock the fetching or try it
        async function fetchBookings() {
            try {
                const res = await api.get('/bookings/interviewer/101'); // Mock ID 101
                if (res.data.length > 0) {
                    setBookings(res.data.map((b: any) => ({
                        id: b.id,
                        candidateName: b.candidate?.name || "Unknown Candidate",
                        startTime: b.startTime,
                        status: b.status
                    })));
                }
            } catch (e) {
                // Fallback or empty
            }
        }
        fetchBookings();
    }, []);

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Earnings</p>
                            <p className="text-2xl font-bold text-gray-900">$1,250.00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Upcoming Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Completion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">100%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Booking Requests</h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {bookings.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No pending requests found.
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking.id} className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                                        {booking.candidateName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{booking.candidateName}</p>
                                        <p className="text-sm text-gray-500">Requested for {new Date(booking.startTime).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">Decline</Button>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Accept Request</Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
