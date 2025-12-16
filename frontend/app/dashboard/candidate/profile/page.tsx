"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { User, Briefcase, FileText, Mail, Save } from "lucide-react";

export default function CandidateProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [candidateId, setCandidateId] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        resumeUrl: "",
        skills: ""
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.id) {
                setCandidateId(user.id);
                fetchProfile(user.id);
            }
        } else {
            // Fallback or redirect if not logged in
            fetchProfile(1); // Keep fallback for now to avoid breaking if not logged in
        }
    }, []);

    const fetchProfile = async (id: number) => {
        setIsLoading(true);
        try {
            const res = await api.get(`/candidates/${id}`);
            setFormData({
                name: res.data.name || "",
                email: res.data.email || "",
                resumeUrl: res.data.resumeUrl || "",
                skills: res.data.skills || ""
            });
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
            await api.put(`/candidates/${candidateId}`, formData);
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
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 text-sm">Manage your personal information</p>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" /> Resume URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.resumeUrl}
                        onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" /> Skills & Expertise
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Java, Python, System Design, React..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">Separate skills with commas.</p>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={isSaving} className="min-w-[140px]">
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
