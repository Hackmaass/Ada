"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

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
  { label: 'GitHub',   href: '#',                    icon: Github   },
  { label: 'LinkedIn', href: '#',                    icon: Linkedin },
  { label: 'Twitter',  href: '#',                    icon: Twitter  },
  { label: 'Email',    href: 'mailto:hello@ada.ai',  icon: Mail     },
];

export function Footer() {
  return (
    <footer className="ada-footer">
      {/* Main Grid */}
      <div className="ada-footer-inner">
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
      </div>

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
