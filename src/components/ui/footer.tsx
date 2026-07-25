"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail } from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const GithubIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M20 4L4 20" />
  </svg>
);

const navigationLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Features',     href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'About',        href: '#about' },
];

const resourceLinks = [
  { label: 'GitHub',        href: '#' },
  { label: 'Documentation', href: '#' },
  { label: 'Privacy',       href: '#' },
  { label: 'Terms',         href: '#' },
];

const contactLinks = [
  { label: 'GitHub',   href: '#',                    icon: GithubIcon   },
  { label: 'LinkedIn', href: '#',                    icon: LinkedinIcon },
  { label: 'X',        href: '#',                    icon: XIcon        },
  { label: 'Email',    href: 'mailto:hello@ada.ai',  icon: Mail         },
];

export function Footer() {
  return (
    <footer className="ada-footer">
      {/* Main Grid */}
      <motion.div
        className="ada-footer-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ada-footer-grid">

          {/* ── Brand Column ── */}
          <div className="ada-footer-brand">
            <span className="ada-footer-logo">Ada</span>
            <p className="ada-footer-tagline">
              Engineering Intelligence
              <br />
              for Modern Hiring
            </p>
            <div className="ada-footer-socials">
              {contactLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <Link key={s.label} href={s.href} aria-label={s.label} className="ada-social-icon">
                    <Icon size={17} strokeWidth={1.5} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Navigation ── */}
          <div>
            <h4 className="ada-footer-col-heading">Navigation</h4>
            <ul className="ada-footer-link-list">
              {navigationLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ada-footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="ada-footer-col-heading">Resources</h4>
            <ul className="ada-footer-link-list">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ada-footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="ada-footer-col-heading">Contact</h4>
            <ul className="ada-footer-link-list">
              {contactLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <Link href={s.href} className="ada-footer-contact-link">
                      <Icon size={14} strokeWidth={1.5} />
                      <span>{s.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="ada-footer-bottom">
        <div className="ada-footer-bottom-inner">
          <p className="ada-footer-copy">
            © 2025 Ada. Built for evidence-based engineering hiring.
          </p>
          <p className="ada-footer-rights">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
