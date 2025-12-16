"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Calendar, Video, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SchedulePage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        let id = 2;
        if (userStr) {
            const user = JSON.parse(userStr);
            id = user.id;
        }
        api.get(`/bookings/interviewer/${id}`)
            .then(res => setBookings(res.data.filter((b: any) => b.status === "CONFIRMED")))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading schedule...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Schedule</h1>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{booking.candidate?.name || "Candidate"}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(booking.startTime).toLocaleString()}
                                </p>
                            </div>
                            <Link href={`/dashboard/meeting/${booking.id}`}>
                                <Button variant="secondary" className="text-blue-600 bg-blue-50 hover:bg-blue-100">
                                    Start Session <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No upcoming confirmed sessions.</p>
                )}
            </div>
        </div>
    );
}
