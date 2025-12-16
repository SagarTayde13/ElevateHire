"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CandidateDashboard() {
    const [name, setName] = useState("Candidate");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.id) {
                api.get(`/candidates/${user.id}`)
                    .then(res => {
                        if (res.data.name) setName(res.data.name);
                    })
                    .catch(err => console.error(err));
            }
        }
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Welcome back, {name}!</h2>
                <p className="text-blue-100 mb-6 max-w-xl">
                    You have 1 upcoming interview scheduled. Preparation is key to success.
                </p>
                <Link href="/dashboard/candidate/search">
                    <Button className="bg-white text-blue-700 hover:bg-blue-50 border-none">
                        Book Another Session
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Upcoming Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Upcoming Interview</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">CONFIRMED</span>
                    </div>

                    <div className="flex items-start gap-4 mb-6">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-900">System Design Mock</p>
                            <p className="text-sm text-gray-500">with Sarah Connor (Google)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Today
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> 5:00 PM EST
                        </div>
                    </div>

                    <Button className="w-full" variant="outline">Join Meeting Room</Button>
                </div>

                {/* Stats / Progress */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Your Progress</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Resume Completeness</span>
                                <span className="font-bold text-blue-600">85%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[85%]" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Interviews Completed</span>
                                <span className="font-bold text-gray-900">3</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Link href="/dashboard/candidate/profile" className="flex items-center justify-between text-sm font-medium text-blue-600 hover:text-blue-700">
                                Update Profile <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
