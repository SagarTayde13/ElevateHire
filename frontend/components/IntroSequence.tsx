"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Terminal, Zap } from "lucide-react";

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Timeline
        const timer1 = setTimeout(() => setStep(1), 500);   // "REDEFINE"
        const timer2 = setTimeout(() => setStep(2), 1500);  // "YOUR"
        const timer3 = setTimeout(() => setStep(3), 2500);  // "FUTURE"
        const timer4 = setTimeout(() => setStep(4), 3800);  // Loading Bar
        const timer5 = setTimeout(() => onComplete(), 5300); // Finish

        return () => {
            [timer1, timer2, timer3, timer4, timer5].forEach(clearTimeout);
        };
    }, [onComplete]);

    const textVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, scale: 1.5, filter: "blur(20px)", transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-blue-600 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-purple-600 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            {/* Kinetic Type Sequence */}
            <div className="relative z-10 text-center">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.h1 key="step1" variants={textVariants} initial="hidden" animate="visible" exit="exit" className="text-6xl md:text-8xl font-black tracking-tighter italic">
                            REDEFINE
                        </motion.h1>
                    )}

                    {step === 2 && (
                        <motion.h1 key="step2" variants={textVariants} initial="hidden" animate="visible" exit="exit" className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 italic">
                            YOUR
                        </motion.h1>
                    )}

                    {step === 3 && (
                        <motion.h1 key="step3" variants={textVariants} initial="hidden" animate="visible" exit="exit" className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 italic">
                            FUTURE
                        </motion.h1>
                    )}
                </AnimatePresence>
            </div>

            {/* Final Loader */}
            <AnimatePresence>
                {step >= 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-20 w-64 md:w-96"
                    >
                        <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                            <span>LOADING ASSETS</span>
                            <span>100%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                        </div>
                        <div className="mt-4 text-center text-xs text-gray-500 font-mono">
                            ELEVATE_HIRE_V2.0
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
