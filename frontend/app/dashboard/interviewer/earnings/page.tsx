"use client";

import { DollarSign, TrendingUp, Calendar } from "lucide-react";

export default function EarningsPage() {
    // Mock data for demo
    const stats = {
        totalEarnings: 1540,
        pendingPayout: 320,
        completedSessions: 12,
        thisMonth: 450
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Earnings & Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Earnings</p>
                    <div className="flex items-center gap-2 mt-2">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        <span className="text-3xl font-bold text-gray-900">${stats.totalEarnings}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Pending Payout</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-yellow-600" />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">${stats.pendingPayout}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Sessions</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        <span className="text-3xl font-bold text-gray-900">{stats.completedSessions}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">This Month</p>
                    <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                        <span className="text-3xl font-bold text-gray-900">+${stats.thisMonth}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Transaction History</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 text-xs">
                                    INV
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Payment for Details Session</p>
                                    <p className="text-xs text-gray-500">Dec {10 + i}, 2025</p>
                                </div>
                            </div>
                            <span className="font-bold text-green-600">+$120.00</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
