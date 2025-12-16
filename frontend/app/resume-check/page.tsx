"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useState } from "react";
import { Flame, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeCheckPage() {
    const [resumeText, setResumeText] = useState("");
    const [result, setResult] = useState("");
    const [mode, setMode] = useState<"ROAST" | "IMPROVE" | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (selectedMode: "ROAST" | "IMPROVE") => {
        if (!resumeText.trim()) return;
        setLoading(true);
        setMode(selectedMode);
        setResult("");

        try {
            // Artificial delay for "AI" effect
            setTimeout(async () => {
                const res = await api.post("/resume/analyze", {
                    text: resumeText,
                    mode: selectedMode
                });
                setResult(res.data.message);
                setLoading(false);
            }, 1500);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
            <Navbar />

            <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Resume Roaster AI
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Dare to be roasted? Or do you just want some honest feedback? <br />
                        Paste your resume details below.
                    </p>
                </div>

                <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                    <textarea
                        className="w-full h-64 bg-transparent border-none outline-none text-gray-300 placeholder-gray-600 resize-none font-mono text-sm leading-relaxed"
                        placeholder="Paste your resume content here (Experience, Skills, Summary)..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => handleAnalyze("ROAST")}
                        disabled={loading || !resumeText}
                        className="h-14 px-8 text-lg rounded-full bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105"
                    >
                        {loading && mode === "ROAST" ? <Loader2 className="animate-spin" /> : <Flame className="mr-2" />}
                        Roast Me
                    </Button>
                    <Button
                        onClick={() => handleAnalyze("IMPROVE")}
                        disabled={loading || !resumeText}
                        className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:scale-105"
                    >
                        {loading && mode === "IMPROVE" ? <Loader2 className="animate-spin" /> : <CheckCircle className="mr-2" />}
                        Constructive Feedback
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mt-12 p-8 rounded-2xl border ${mode === "ROAST" ? "bg-red-950/30 border-red-500/30 text-red-200" : "bg-blue-950/30 border-blue-500/30 text-blue-200"}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {mode === "ROAST" ? <Flame className="w-6 h-6 text-red-500" /> : <CheckCircle className="w-6 h-6 text-blue-500" />}
                                <h3 className="text-xl font-bold uppercase tracking-wider">{mode === "ROAST" ? "AI Verdict: Ouch" : "AI Suggestions"}</h3>
                            </div>
                            <p className="text-xl font-medium leading-relaxed">"{result}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
