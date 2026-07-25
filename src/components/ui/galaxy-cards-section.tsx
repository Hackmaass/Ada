"use client";

import React from 'react';
import Galaxy from './Galaxy';
import ElectricBorder from './ElectricBorder';
import { Terminal, ShieldCheck, BrainCircuit, Sparkles, Target, FileText } from 'lucide-react';

const features = [
  {
    title: 'GitHub Intelligence Engine',
    description: 'Deep repository analysis using AST Parsing, Tree-sitter, Commit Graph Analysis, and Static Analysis to understand real engineering contributions.',
    icon: Terminal,
  },
  {
    title: 'AI Technical Due Diligence',
    description: 'Verify resume claims against GitHub evidence and generate Engineering Quality, Authenticity, and Evidence Confidence Scores.',
    icon: ShieldCheck,
  },
  {
    title: 'Repository Intelligence',
    description: 'Analyze architecture, code quality, project complexity, documentation, and engineering practices using RAG-powered repository understanding.',
    icon: BrainCircuit,
  },
  {
    title: 'AI Hiring Copilot',
    description: 'Recruiters describe the ideal engineer in natural language and Ada instantly returns the best evidence-backed candidates.',
    icon: Sparkles,
  },
  {
    title: 'Job-Aware Candidate Ranking',
    description: 'Candidates are ranked specifically for each job using semantic matching, technical evidence, and engineering relevance — not keyword matching.',
    icon: Target,
  },
  {
    title: 'Explainable AI Reports',
    description: 'Every hiring recommendation includes transparent reasoning, technical evidence, strengths, weaknesses, and interview suggestions.',
    icon: FileText,
  },
];

export const GalaxyCardsSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ minHeight: '100vh' }}
    >
      {/* Galaxy Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Galaxy
          className="w-full h-full"
          starSpeed={0.5}
          density={2.8}
          hueShift={0}
          speed={0}
          glowIntensity={0.2}
          saturation={0}
          mouseRepulsion={false}
          repulsionStrength={0}
          twinkleIntensity={0.15}
          rotationSpeed={0}
          transparent
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <span
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#5B73AE' }}
          >
            Features
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-7"
            style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
          >
            Engineering Intelligence
            <br />
            <span style={{ color: '#5B73AE' }}>Built for Modern Hiring</span>
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mx-auto max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Ada verifies engineering talent using real technical evidence —
            transforming GitHub repositories, resumes, and projects into
            explainable hiring intelligence.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '24px',
          }}
          className="galaxy-cards-grid"
        >
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div key={idx} className="galaxy-feature-card group">
                <ElectricBorder
                  color="#5B73AE"
                  speed={0.4}
                  chaos={0.015}
                  borderRadius={20}
                  className="galaxy-eb-wrapper"
                  style={{ width: '100%', height: '100%', display: 'flex' }}
                >
                  <div className="galaxy-card-inner">
                    {/* Icon */}
                    <div className="galaxy-card-icon">
                      <IconComponent
                        size={22}
                        strokeWidth={1.5}
                        style={{ color: '#5B73AE' }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="galaxy-card-title">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="galaxy-card-desc">
                      {feature.description}
                    </p>
                  </div>
                </ElectricBorder>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
