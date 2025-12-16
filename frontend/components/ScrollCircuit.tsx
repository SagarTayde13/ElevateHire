"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollCircuit() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed left-0 top-0 bottom-0 w-16 z-40 hidden xl:flex flex-col items-center pointer-events-none">
            {/* The Track */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-white/10" />

            {/* The Circuit Fill */}
            <motion.div
                className="absolute top-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 origin-top"
                style={{ scaleY, height: "100%" }}
            >
                {/* The Data Node (Head) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] border border-white">
                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75" />
                </div>
            </motion.div>
        </div>
    );
}
