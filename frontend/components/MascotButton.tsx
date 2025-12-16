"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cat, Bot } from "lucide-react";
import React from "react";

interface MascotButtonProps extends React.ComponentProps<typeof Button> {
    mascot?: "cat" | "bot";
    children: React.ReactNode;
}

export default function MascotButton({ mascot = "cat", children, className, ...props }: MascotButtonProps) {
    return (
        <motion.div
            className="relative group inline-block"
            initial="initial"
            whileHover="hover"
        >
            {/* The Mascot */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 text-white pointer-events-none z-0"
                variants={{
                    initial: { y: 20, opacity: 0, scale: 0.8 },
                    hover: {
                        y: -32,
                        opacity: 1,
                        scale: 1,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }
                    }
                }}
            >
                {mascot === "cat" ? (
                    <Cat className="w-8 h-8 fill-gray-900 text-white" />
                ) : (
                    <Bot className="w-8 h-8 fill-blue-500 text-white" />
                )}
            </motion.div>

            {/* The Button */}
            <div className="relative z-10">
                <Button className={className} {...props}>
                    {children}
                </Button>
            </div>
        </motion.div>
    );
}
