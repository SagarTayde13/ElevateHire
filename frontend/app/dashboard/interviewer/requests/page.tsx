"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Check, X, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RequestsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [interviewerId, setInterviewerId] = useState(2);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setInterviewerId(user.id);
            fetchBookings(user.id);
        } else {
            fetchBookings(2);
        }
    }, []);

    const fetchBookings = async (id: number) => {
        try {
            const res = await api.get(`/bookings/interviewer/${id}`);
            setBookings(res.data.filter((b: any) => b.status === "PENDING"));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (id: number, status: string) => {
        try {
            await api.put(`/bookings/${id}/status`, { status });
            // Remove from list
            setBookings(bookings.filter(b => b.id !== id));
            alert(`Booking ${status.toLowerCase()}!`);
        } catch (e) {
            alert("Action failed.");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading requests...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Booking Requests</h1>

            {bookings.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-500">No pending requests at the moment.</p>
                </div>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                Request from {booking.candidate?.name || "Candidate"}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {new Date(booking.startTime).toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    System Design Interview
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleStatus(booking.id, 'CANCELLED')}
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                                <X className="w-4 h-4 mr-2" /> Decline
                            </Button>
                            <Button
                                onClick={() => handleStatus(booking.id, 'CONFIRMED')}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Check className="w-4 h-4 mr-2" /> Accept
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
