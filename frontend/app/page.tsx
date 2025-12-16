"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Star, Users, Video, Zap, ArrowRight, Play, Code2, Terminal } from "lucide-react";
import Link from "next/link"; // Correct import for Next.js Link
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useEffect, MouseEvent } from "react";
import IntroSequence from "@/components/IntroSequence";
import MascotButton from "@/components/MascotButton";
import ScrollCircuit from "@/components/ScrollCircuit";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenIntro");
    if (hasSeen) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      <AnimatePresence mode="wait">
        {showIntro && <IntroSequence key="intro" onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ScrollCircuit />
          <div className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
            {/* Custom Navbar Overlay if needed, or reuse existing */}
            <Navbar />
          </div>

          {/* Hero Section */}
          <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Animated Aurora Background */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
              <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Left Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm"
                  >
                    <Zap className="w-3 h-3 fill-current" />
                    <span>v2.0 Now Live</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-6xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight"
                  >
                    Code Like <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient-x">
                      A Legend.
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                  >
                    Master technical interviews with direct mentorship from FAANG engineers. Real environments, brutal feedback, zero fluff.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6"
                  >
                    <Link href="/signup" passHref>
                      <MascotButton mascot="cat" size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold">
                        Start Coding <Terminal className="ml-2 w-5 h-5" />
                      </MascotButton>
                    </Link>
                    <Link href="/signup" passHref>
                      <MascotButton mascot="bot" variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/20 bg-black/50 hover:bg-white/10 text-white backdrop-blur-sm transition-all">
                        <Play className="mr-2 w-5 h-5" /> Demo Video
                      </MascotButton>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500"
                  >
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 15})`, backgroundSize: 'cover' }}></div>
                      ))}
                    </div>
                    <p>Trusted by engineers at Google, Meta, & Netflix</p>
                  </motion.div>
                </div>

                {/* Right Visual: Code Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2 perspective-1000"
                >
                  <div className="relative bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-500">
                    {/* Window Controls */}
                    <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <div className="ml-4 text-xs text-gray-500 font-mono">interview_session.ts — active</div>
                    </div>

                    {/* Code Content */}
                    <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none" />

                      <div className="text-gray-400">
                        <span className="text-purple-400">class</span> <span className="text-yellow-300">Solution</span> {"{"} <br />
                        &nbsp;&nbsp;<span className="text-purple-400">public</span> <span className="text-blue-400">int</span> <span className="text-yellow-300">maxArea</span>(<span className="text-blue-400">int</span>[] <span className="text-gray-300">height</span>) {"{"} <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Two pointer approach</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">int</span> <span className="text-gray-300">left</span> = <span className="text-green-400">0</span>; <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">int</span> <span className="text-gray-300">right</span> = <span className="text-gray-300">height.length</span> - <span className="text-green-400">1</span>; <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">int</span> <span className="text-gray-300">max</span> = <span className="text-green-400">0</span>; <br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">while</span> (<span className="text-gray-300">left</span> &lt; <span className="text-gray-300">right</span>) {"{"} <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500 animate-pulse">|</span> <br />
                      </div>
                    </div>

                    {/* Overlay Card */}
                    <div className="absolute bottom-6 right-6 bg-gray-900/90 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-xl max-w-xs z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-semibold text-white">Optimal Solution</p>
                      </div>
                      <p className="text-xs text-gray-400">"Great usage of the two-pointer technique to reduce time complexity to O(n)."</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Spotlight Features Grid */}
          <section className="py-32 bg-black relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Built for the <span className="text-purple-500">Ambitious</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to go from preparation to offer letter.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <SpotlightCard>
                  <Shield className="w-10 h-10 text-cyan-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">Verified FAANG Engineers</h3>
                  <p className="text-gray-400">Mentors from Google, Amazon, and Netflix. We verify employment so you know it's real.</p>
                </SpotlightCard>
                <SpotlightCard>
                  <Code2 className="w-10 h-10 text-purple-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">Live Coding Environment</h3>
                  <p className="text-gray-400">Collaborative IDE with syntax highlighting, execution, and whiteboard support.</p>
                </SpotlightCard>
                <SpotlightCard>
                  <Zap className="w-10 h-10 text-yellow-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">Instant Feedback Loops</h3>
                  <p className="text-gray-400">Detailed scorecards after every session. Know exactly where you stand.</p>
                </SpotlightCard>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-32 bg-gradient-to-b from-black to-gray-900 border-t border-white/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tighter text-white">
                Don't just practice.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Perform.</span>
              </h2>
              <Link href="/signup" passHref>
                <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}

function SpotlightCard({ children }: { children: React.ReactNode }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-3xl p-8 transition-colors hover:border-white/20"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
