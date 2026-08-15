import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  BookOpen,
  FileText,
  Trophy,
  ChevronDown,
  Check,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Mock Interviews',
    description:
      'Experience realistic HR, DSA, System Design, and Behavioral interviews powered by adaptive AI.',
  },
  {
    icon: BookOpen,
    title: 'Language Documentation',
    description:
      'Study core concepts, syntax sheets, and top interview questions for 7 essential languages.',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description:
      'Upload your resume and get immediate ATS feedback, score breakdown, and actionable tips.',
  },
  {
    icon: Trophy,
    title: 'Placement Roadmaps',
    description:
      'Follow structured preparation roadmaps customized for your target roles and companies.',
  },
];

const faqs = [
  {
    q: 'Is Intervo free to use?',
    a: 'Yes! You can start with our free plan immediately and upgrade to Pro whenever you need unlimited access.',
  },
  {
    q: 'Which programming languages are covered?',
    a: 'Java, C++, Python, C, HTML, SQL, React, and more in our interactive syntax and concept documentation.',
  },
  {
    q: 'How realistic are the AI mock interviews?',
    a: 'Our AI simulates realistic interview environments with role-specific questions and instantaneous evaluation of your answers.',
  },
  {
    q: 'Can I track my preparation progress over time?',
    a: 'Yes, your dashboard automatically tracks completed interviews, problems solved, average score metrics, and XP level progress.',
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden bg-[#0e0e0e] text-[#e5e5e5] min-h-screen">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,104,75,0.12),rgba(255,255,255,0))]" />

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#0e0e0e]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#d4684b] flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-white/90 tracking-tight">
              Intervo
            </span>
          </Link>

          <nav className="hidden gap-8 text-xs font-medium text-white/50 lg:flex">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-medium text-white/60 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 bg-[#d4684b] hover:bg-[#c45f43] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-white/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4684b]" />
              AI-Powered Interview Coach
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
              Nail your next interview with <span className="text-[#d4684b]">AI guidance.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/40">
              Practice real-time technical & HR mock interviews, master language documentation, and optimize your resume on one clean platform.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-[#d4684b] hover:bg-[#c45f43] text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Start Free Preparation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 text-sm font-medium px-6 py-2.5 rounded-lg border border-white/[0.08] transition-colors"
              >
                Explore Features
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Everything required to land the offer
            </h2>
            <p className="mt-3 text-sm text-white/40">
              Built specifically for software engineers and computer science candidates.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#d4684b] mb-4">
                  <feature.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section id="workflow" className="py-24 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              How Intervo works
            </h2>
            <p className="mt-3 text-sm text-white/40">
              A structured system designed to raise your performance standard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Upload Resume', desc: 'Instant ATS feedback & skill gaps analysis.', step: '01' },
              { title: 'Personalized Plan', desc: 'Custom roadmaps target your key weaknesses.', step: '02' },
              { title: 'Daily Practice', desc: 'Mock interviews, syntax sheets, & coding exercises.', step: '03' },
              { title: 'Track Mastery', desc: 'Detailed metrics and progress reports.', step: '04' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] relative flex flex-col justify-between h-40"
              >
                <span className="text-xs font-mono text-white/20">{item.step}</span>
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-sm text-white/40">
              Start for free, upgrade when you are ready to accelerate.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {/* Free */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-between">
              <div>
                <h3 className="text-base font-medium text-white">Free Starter</h3>
                <p className="mt-1 text-xs text-white/40">Essential tools to begin.</p>
                <div className="my-6">
                  <span className="text-3xl font-semibold text-white">₹0</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white/60">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> 5 AI Mock Interviews</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> Basic Resume Scoring</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> Full Language Syntax Documentation</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> Placement Roadmaps Access</li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="mt-8 block text-center bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium py-2.5 rounded-lg border border-white/[0.08] transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-xl border border-[#d4684b]/40 bg-white/[0.03] relative flex flex-col justify-between">
              <div className="absolute top-4 right-4 bg-[#d4684b]/15 text-[#d4684b] text-[10px] font-semibold px-2 py-0.5 rounded">
                RECOMMENDED
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Pro Pass</h3>
                <p className="mt-1 text-xs text-white/40">Complete AI interview prep toolkit.</p>
                <div className="my-6">
                  <span className="text-3xl font-semibold text-white">₹499</span>
                  <span className="text-xs text-white/40"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white/80">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> Unlimited AI Mock Interviews</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> In-depth Resume ATS Reviews</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> Company-Specific Roadmaps</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#d4684b]" /> Detailed Performance Analytics</li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="mt-8 block text-center bg-[#d4684b] hover:bg-[#c45f43] text-white text-xs font-medium py-2.5 rounded-lg transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-24 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-medium text-white/80 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-white/40 leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/[0.06] py-10 bg-[#0a0a0a]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#d4684b] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white/90">Intervo</span>
          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Intervo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}