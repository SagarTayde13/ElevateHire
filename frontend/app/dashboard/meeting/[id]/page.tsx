"use client";

import { Button } from "@/components/ui/button";
import { Mic, Video, PhoneOff, Monitor, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MeetingPage() {
    const params = useParams();
    const mid = params.id;

    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    <h1 className="font-medium">Mock Interview #{mid}</h1>
                    <span className="text-gray-400 text-sm ml-2">00:12:45</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                        <Users className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                        <MessageSquare className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Main Video Area */}
            <main className="flex-1 p-4 flex gap-4">
                {/* Main Speaker */}
                <div className="flex-1 bg-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            SC
                        </div>
                        <h2 className="text-xl font-medium">Sarah Connor</h2>
                        <p className="text-gray-400">Interviewer</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs font-medium">
                        Active Speaker
                    </div>
                </div>

                {/* Side/Self View */}
                <div className="w-80 flex flex-col gap-4">
                    <div className="h-56 bg-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-blue-500/50">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2">
                                ME
                            </div>
                            <p className="text-sm text-gray-300">You</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-gray-800 rounded-2xl p-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Interview Notes</h3>
                        <div className="h-full border border-dashed border-gray-700 rounded-xl flex items-center justify-center text-gray-600 text-sm">
                            Shared Notepad
                        </div>
                    </div>
                </div>
            </main>

            {/* Controls */}
            <footer className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-4">
                <Button size="icon" className="h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 border-none">
                    <Mic className="w-5 h-5" />
                </Button>
                <Button size="icon" className="h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 border-none">
                    <Video className="w-5 h-5" />
                </Button>
                <Button size="icon" className="h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 border-none">
                    <Monitor className="w-5 h-5" />
                </Button>
                <div className="w-8"></div>
                <Link href="/dashboard/candidate/bookings">
                    <Button size="lg" className="h-12 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium">
                        <PhoneOff className="w-5 h-5 mr-2" />
                        Leave Call
                    </Button>
                </Link>
            </footer>
        </div>
    );
}
