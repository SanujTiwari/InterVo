import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Brain,
  BookOpen,
  FileText,
  Trophy,
  CheckCircle2,
  Sparkles,
  ChevronDown
} from 'lucide-react';

import Button from '../components/ui/Button';

const features = [
  {
    icon: Brain,
    title: 'AI Mock Interviews',
    description:
      'Experience realistic HR, DSA, System Design and Behavioral interviews powered by AI.',
  },
  {
    icon: BookOpen,
    title: 'Language Documentation',
    description:
      'Study core concepts, cheatsheets, and top interview questions for 7 key languages.',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description:
      'Upload your resume and receive ATS score with AI suggestions.',
  },
  {
    icon: Trophy,
    title: 'Placement Roadmaps',
    description:
      'Follow personalized preparation roadmaps designed for your target company.',
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-navy-950 text-white min-h-screen">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#d4684b]/10 blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#e88d72]/10 blur-[130px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-xl bg-navy-950/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span>
              Inter<span className="gradient-text">vo</span>
            </span>
          </Link>

          <nav className="hidden gap-10 text-sm font-medium text-slate-400 lg:flex">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4684b]/30 bg-[#d4684b]/10 px-4 py-2 text-sm text-[#d4684b]">
              <Sparkles className="h-4 w-4" />
              AI Powered Placement Preparation Platform
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl text-white">
              Crack Your
              <br />
              <span className="bg-gradient-to-r from-[#d4684b] to-[#e88d72] bg-clip-text text-transparent">
                Dream Tech Job
              </span>
              <br />
              with AI
            </h1>

            <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
              Practice realistic AI interviews, study language documentation,
              analyze your resume, and track everything from one beautiful, unified dashboard.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                >
                  Start Preparing Free
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="secondary"
                >
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Free Forever Plan Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>100% Secure & Private</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="py-24 border-t border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <span className="rounded-full bg-[#d4684b]/10 px-5 py-2 text-xs font-semibold text-[#d4684b] uppercase tracking-wider">
              Features
            </span>
            <h2 className="mt-6 text-3xl sm:text-5xl font-black text-white">
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-[#d4684b] to-[#e88d72] bg-clip-text text-transparent">
                To Crack Interviews
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400">
              One platform for language documentation, AI mock interviews,
              resume analysis, and personalized learning roadmaps.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -5,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all"
              >
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl bg-[#d4684b]/10 p-4 text-[#d4684b] group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AI WORKFLOW ================= */}
      <section className="relative py-28 border-t border-white/5 bg-navy-950">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-20 text-center">
            <span className="rounded-full bg-[#d4684b]/10 px-5 py-2 text-xs font-semibold text-[#d4684b] uppercase tracking-wider">
              Workflow
            </span>
            <h2 className="mt-6 text-3xl sm:text-5xl font-black text-white">
              Prepare Smarter
              <br />
              <span className="bg-gradient-to-r from-[#d4684b] to-[#e88d72] bg-clip-text text-transparent">
                With AI Guidance
              </span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Upload Resume',
                desc: 'AI analyzes your resume and identifies weak sections.',
                step: '01'
              },
              {
                title: 'Receive Roadmap',
                desc: 'Get a personalized preparation roadmap based on your target company.',
                step: '02'
              },
              {
                title: 'Practice Daily',
                desc: 'Solve coding problems, aptitude tests and mock interviews.',
                step: '03'
              },
              {
                title: 'Track Progress',
                desc: 'Monitor your strengths, weaknesses and interview readiness.',
                step: '04'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl relative"
              >
                <span className="text-3xl font-black text-[#d4684b]/20 absolute top-4 right-4">{item.step}</span>
                <h3 className="mb-3 text-lg font-bold text-white mt-4">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className="py-28 border-t border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-20 text-center">
            <span className="rounded-full bg-[#d4684b]/10 px-5 py-2 text-xs font-semibold text-[#d4684b] uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="mt-6 text-3xl sm:text-5xl font-black text-white">
              Choose Your
              <span className="bg-gradient-to-r from-[#d4684b] to-[#e88d72] bg-clip-text text-transparent">
                {' '}Plan
              </span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Free</h3>
                <p className="mt-2 text-xs text-slate-400">Perfect for getting started.</p>
                <h2 className="my-6 text-4xl font-black text-white">₹0</h2>
                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ 5 AI Mock Interviews</li>
                  <li className="flex items-center gap-2">✓ Basic Resume Analysis</li>
                  <li className="flex items-center gap-2">✓ Syntax & Concept Guides</li>
                  <li className="flex items-center gap-2">✓ Core Study Roadmaps</li>
                </ul>
              </div>
              <Link to="/signup" className="mt-8">
                <Button className="w-full" variant="secondary">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative overflow-hidden rounded-3xl border border-[#d4684b]/50 bg-gradient-to-br from-[#d4684b]/10 to-[#e88d72]/10 p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(212,104,75,0.1)]">
              <div className="absolute right-5 top-5 rounded-full bg-[#d4684b] px-3 py-1 text-[10px] font-bold text-white">
                POPULAR
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Pro</h3>
                <p className="mt-2 text-xs text-slate-300">Unlimited AI powered preparation.</p>
                <h2 className="my-6 text-4xl font-black text-white">
                  ₹499
                  <span className="text-sm font-normal text-slate-400">/month</span>
                </h2>
                <ul className="space-y-4 text-xs text-slate-200">
                  <li className="flex items-center gap-2">✓ Unlimited AI Mock Interviews</li>
                  <li className="flex items-center gap-2">✓ Unlimited Detailed Resume Reviews</li>
                  <li className="flex items-center gap-2">✓ Unlimited Company-Specific Roadmaps</li>
                  <li className="flex items-center gap-2">✓ Advanced Concept & Prep Libraries</li>
                  <li className="flex items-center gap-2">✓ In-Depth Performance Analytics</li>
                </ul>
              </div>
              <Link to="/signup" className="mt-8">
                <Button className="w-full" variant="primary">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section
        id="faq"
        className="py-28 border-t border-white/5 bg-navy-950"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <span className="rounded-full bg-[#d4684b]/10 px-5 py-2 text-xs font-semibold text-[#d4684b] uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="mt-6 text-3xl sm:text-5xl font-black text-white">
              Frequently Asked
              <span className="bg-gradient-to-r from-[#d4684b] to-[#e88d72] bg-clip-text text-transparent">
                {' '}Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is Intervo free to use?',
                a: 'Yes. You can start with our free plan and upgrade anytime for advanced features.',
              },
              {
                q: 'Which programming languages are supported?',
                a: 'Java, C++, Python, C, HTML, SQL, React and many more in our Syntax Guides.',
              },
              {
                q: 'Are AI interviews realistic?',
                a: 'Yes. They simulate real technical, HR and behavioral interviews, complete with comprehensive scoring metrics.',
              },
              {
                q: 'Can I track my progress?',
                a: 'Yes. Intervo provides detailed stats dashboard containing resume ratings and interview reports.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-white/[0.01] p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-[32px] border border-[#d4684b]/20 bg-gradient-to-br from-[#d4684b]/10 via-navy-950 to-[#e88d72]/10 p-12 text-center shadow-[0_0_40px_rgba(212,104,75,0.05)]">
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Ready To Land Your
              <span className="bg-gradient-to-r from-[#d4684b] to-[#e88d72] bg-clip-text text-transparent">
                {' '}Dream Job?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Join students preparing smarter with AI. Practice interviews, study documentation,
              optimize your resume, and get placement ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 py-12 bg-navy-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span>
                Inter<span className="gradient-text">vo</span>
              </span>
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              AI Powered Placement Preparation Platform
            </p>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Intervo. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}