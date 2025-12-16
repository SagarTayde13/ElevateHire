"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { User, Briefcase, Mail, Save, DollarSign, Award } from "lucide-react";

export default function InterviewerProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [interviewerId, setInterviewerId] = useState(2);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        expertise: "",
        hourlyRate: 0
    });

    const fetchProfile = async (id: number) => {
        setIsLoading(true);
        try {
            const res = await api.get(`/interviewers/${id}`);
            if (res.data) {
                setFormData({
                    name: res.data.name || "",
                    email: res.data.email || "",
                    expertise: res.data.expertise || "",
                    hourlyRate: res.data.hourlyRate || 0
                });
            }
        } catch (e) {
            console.error("Failed to load profile", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await api.put(`/interviewers/${interviewerId}`, formData);
            alert("Profile updated successfully!");
        } catch (e) {
            console.error("Failed to update profile", e);
            alert("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Interviewer Profile</h1>
                    <p className="text-gray-500 text-sm">Manage your public profile and rates</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" /> Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Award className="w-4 h-4 text-gray-400" /> Primary Expertise
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. System Design"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            value={formData.expertise}
                            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" /> Hourly Rate ($)
                        </label>
                        <input
                            type="number"
                            min="0"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            value={formData.hourlyRate}
                            onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={isSaving} className="min-w-[140px] bg-purple-600 hover:bg-purple-700">
                        {isSaving ? (
                            "Saving..."
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
