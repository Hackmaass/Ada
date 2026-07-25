"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ShapeGrid from './ShapeGrid';
import Galaxy from './Galaxy';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export const BrandEndingSection = () => {
  return (
    <section className="relative w-full bg-black min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden">
      {/* Subtle background gradient to match the theme without introducing new colors */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B73AE]/5 rounded-full blur-[120px]" />
      </div>

      {/* Ambient pulsing glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(91,115,174,0.08),transparent_70%)] brand-ending-pulse" />
      </div>

      {/* Galaxy Background for visual continuity from Section 4 */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Galaxy
          className="w-full h-full"
          starSpeed={0.3}
          density={1.5}
          hueShift={0}
          speed={0}
          glowIntensity={0.15}
          saturation={0}
          mouseRepulsion={false}
          repulsionStrength={0}
          twinkleIntensity={0.1}
          rotationSpeed={0}
          transparent
        />
      </div>

      {/* ShapeGrid Background — animated diagonal grid, blends behind content */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ opacity: 0.3 }}>
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#5B73AE"
          hoverFillColor="#222222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* Top & Bottom dark fades for canvas content blending */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
      >
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6"
          style={{ fontFamily: "var(--font-heading), 'Inter', system-ui, sans-serif" }}
        >
          Ada — <span className="brand-ending-gradient-text">TalentGraph AI</span>
        </motion.h2>
        
        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl mb-12 max-w-2xl font-light"
          style={{ color: 'rgba(255, 255, 255, 0.45)', lineHeight: '1.8' }}
        >
          Building the future of evidence-based engineering hiring.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary Button */}
          <button className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <div className="absolute inset-0 bg-[#5B73AE]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Join Us</span>
            <div className="absolute -inset-1 bg-white/20 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
          </button>

          {/* Secondary Button */}
          <button className="group relative px-8 py-4 rounded-full bg-transparent text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-[#5B73AE]/30 hover:border-[#5B73AE]">
            <div className="absolute inset-0 bg-[#5B73AE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Know More</span>
            <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(91,115,174,0.0)] group-hover:shadow-[0_0_30px_rgba(91,115,174,0.4)] transition-shadow duration-500" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

