"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Calendar, Clock, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CandidateBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        let id = 1;
        if (userStr) {
            const user = JSON.parse(userStr);
            id = user.id;
        }
        api.get(`/bookings/candidate/${id}`)
            .then(res => setBookings(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading interviews...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Interviews</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <Calendar className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No interviews scheduled</h3>
                    <p className="text-gray-500 mb-4">Book your first mock interview with an expert.</p>
                    <Link href="/dashboard/candidate/search">
                        <Button>Find an Interviewer</Button>
                    </Link>
                </div>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                    booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                    {booking.status}
                                </span>
                                <span className="text-sm text-gray-500">#{booking.id}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Mock Interview with {booking.interviewer?.name || "Interviewer"}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(booking.startTime).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>

                        <div>
                            {booking.status === 'CONFIRMED' ? (
                                <Link href={`/dashboard/meeting/${booking.id}`}>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Video className="w-4 h-4 mr-2" /> Join Meeting
                                    </Button>
                                </Link>
                            ) : booking.status === 'PENDING' ? (
                                <Button variant="outline" disabled>
                                    <Clock className="w-4 h-4 mr-2" /> Awaiting Confirmation
                                </Button>
                            ) : (
                                <Button variant="secondary" disabled>Ended</Button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
