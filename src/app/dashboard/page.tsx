"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Galaxy from "@/components/ui/Galaxy";
import {
  GitBranch,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  RefreshCw,
  Award,
  BookOpen,
  Code2,
  Info,
} from "lucide-react";

const API_URL = "http://localhost:8000/api/v1/analyze";

interface ReportData {
  executive_summary?: string;
  recommendation?: string;
  evidence_confidence_score?: number;
  verified_skills?: string[];
  unverified_skills?: string[];
  strengths?: string[];
  weaknesses?: string[];
  repository_highlights?: string[];
  risk_flags?: string[];
  evidence_notes?: string[];
  candidate_name?: string;
  github_username?: string;
  github_profile_url?: string;
  parsed_claims?: {
    skills?: string[];
    frameworks?: string[];
    architecture_experience?: string[];
  };
  status?: string;
  message?: string;
}

export default function DashboardPage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    "Extracting Resume PDF & Claims",
    "Fetching GitHub Profile & Repositories",
    "Cross-Examining Evidence with LangGraph",
    "Synthesizing Executive Due Diligence Report",
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReport(null);

    if (!githubUsername.trim()) {
      setError("GitHub username is required.");
      return;
    }

    if (!resumeFile) {
      setError("Resume PDF file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("github_username", githubUsername.trim());
    formData.append("resume_file", resumeFile);

    setLoading(true);
    setCurrentStep(1);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 2500);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const detail =
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail ?? data, null, 2);
        setError(detail);
        return;
      }

      setReport(data);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to reach the analysis API. Ensure the backend is running on localhost:8000."
      );
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
      setCurrentStep(0);
    }
  }

  function getRecommendationBadge(recommendation: string = "") {
    const recLower = recommendation.toLowerCase();
    if (recLower.includes("hire") && !recLower.includes("caution") && !recLower.includes("not")) {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-4 h-4" />
          {recommendation}
        </span>
      );
    }
    if (recLower.includes("caution")) {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <AlertTriangle className="w-4 h-4" />
          {recommendation}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
        <XCircle className="w-4 h-4" />
        {recommendation || "Proceed with Caution"}
      </span>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white font-sans overflow-hidden pt-24 pb-20">
      {/* Background Galaxy & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Galaxy
          className="w-full h-full"
          starSpeed={0.4}
          density={2.2}
          glowIntensity={0.25}
          twinkleIntensity={0.2}
          transparent
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(226,169,241,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold tracking-[0.25em] text-[#e2a9f1] uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" /> ADA // TECHNICAL DUE DILIGENCE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Verify Engineers with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">Evidence</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Upload candidate resume PDF and GitHub profile. ADA will cross-examine claims against real repository metadata and code evidence.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-10 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 opacity-60" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub Username Input */}
              <div className="space-y-2">
                <label htmlFor="github_username" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-purple-400" /> GitHub Username
                </label>
                <div className="relative">
                  <input
                    id="github_username"
                    name="github_username"
                    type="text"
                    placeholder="e.g. torvalds, gaearon, or your username"
                    value={githubUsername}
                    onChange={(event) => setGithubUsername(event.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 rounded-2xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* PDF Resume Upload Input */}
              <div className="space-y-2">
                <label htmlFor="resume_file" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" /> Resume (PDF format)
                </label>
                <div className="relative">
                  <input
                    id="resume_file"
                    name="resume_file"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume_file"
                    className="flex items-center justify-between w-full bg-white/[0.03] border border-dashed border-white/15 hover:border-purple-500/50 rounded-2xl px-4 py-2.5 text-sm cursor-pointer transition-all hover:bg-white/[0.05]"
                  >
                    <span className="text-gray-400 truncate">
                      {resumeFile ? resumeFile.name : "Select or drop PDF resume..."}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-medium shrink-0 ml-2">
                      <Upload className="w-3.5 h-3.5" /> Browse
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-gray-950 text-sm transition-all duration-200 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                style={{ backgroundColor: "#e2a9f1" }}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-gray-950" />
                    Analyzing Candidate...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-gray-950" />
                    Run Technical Due Diligence
                    <ArrowRight className="w-4 h-4 text-gray-950" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Loading Progress State */}
        {loading ? (
          <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-pulse">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 mx-auto">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Executing LangGraph Agentic Pipeline</h3>
              <p className="text-gray-400 text-sm">Cross-examining resume claims against GitHub repository evidence...</p>
            </div>

            <div className="max-w-md mx-auto space-y-3 pt-2">
              {steps.map((stepText, idx) => {
                const stepNum = idx + 1;
                const isDone = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      isDone
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : isCurrent
                        ? "bg-purple-500/10 border-purple-500/40 text-purple-300 font-medium"
                        : "bg-white/[0.02] border-white/5 text-gray-600"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-700 shrink-0" />
                    )}
                    <span className="truncate">{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Error Alert Display */}
        {error ? (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-3xl p-6 shadow-2xl flex items-start gap-4 mb-10">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-rose-300">Analysis Error</h4>
              <pre className="text-xs text-rose-200/80 whitespace-pre-wrap font-mono">{error}</pre>
            </div>
          </div>
        ) : null}

        {/* Report Output Presentation */}
        {report ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Header / Summary Banner */}
            <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {report.candidate_name || report.github_username || "Candidate Assessment"}
                    </h2>
                    {report.github_profile_url ? (
                      <a
                        href={report.github_profile_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <GitBranch className="w-4 h-4" /> Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-400">
                    GitHub Handle: <span className="text-gray-200 font-mono">@{report.github_username}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Score */}
                  <div className="text-right">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Evidence Confidence</div>
                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                      {report.evidence_confidence_score ?? 0}%
                    </div>
                  </div>
                  {/* Recommendation Badge */}
                  <div>{getRecommendationBadge(report.recommendation)}</div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="pt-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" /> Executive Summary
                </h3>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                  {report.executive_summary || "No executive summary generated."}
                </p>
              </div>
            </div>

            {/* Verified vs Unverified Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Verified Skills */}
              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Skills ({report.verified_skills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.verified_skills && report.verified_skills.length > 0 ? (
                    report.verified_skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">No explicitly verified skills cited.</span>
                  )}
                </div>
              </div>

              {/* Unverified Skills */}
              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Unverified / Lacking Evidence ({report.unverified_skills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.unverified_skills && report.unverified_skills.length > 0 ? (
                    report.unverified_skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center gap-1.5"
                      >
                        <Info className="w-3.5 h-3.5 text-amber-400" /> {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">All claimed skills were verified.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses / Risk Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technical Strengths */}
              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" /> Key Technical Strengths
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {report.strengths && report.strengths.length > 0 ? (
                    report.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500 italic">No specific strengths documented.</li>
                  )}
                </ul>
              </div>

              {/* Risk Flags & Weaknesses */}
              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Risk Flags & Gaps
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {report.risk_flags && report.risk_flags.length > 0 ? (
                    report.risk_flags.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))
                  ) : report.weaknesses && report.weaknesses.length > 0 ? (
                    report.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500 italic">No material risk flags identified.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Evidence Notes & Repository Citations */}
            {report.evidence_notes && report.evidence_notes.length > 0 ? (
              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl space-y-4">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" /> Evidence Citations & Notes
                </h3>
                <div className="space-y-3">
                  {report.evidence_notes.map((note, idx) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-sm text-gray-300 flex items-start gap-3">
                      <Code2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
