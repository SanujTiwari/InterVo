import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Mic,
  Code2,
  FileText,
  Map,
  BarChart3,
  Brain,
  ArrowRight,
  Star,
  Users,
  Trophy,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/ui/Button';
import FeatureCard from '../components/FeatureCard';

// Animated counter hook
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return [count, ref];
}

const features = [
  {
    icon: Mic,
    title: 'AI Mock Interviews',
    description: 'Practice with AI interviewers that simulate real technical, behavioral, and HR interview rounds with instant feedback.',
    color: 'blue',
  },
  {
    icon: Code2,
    title: 'Coding Practice',
    description: 'Solve 500+ curated coding problems across all difficulty levels with real-time code execution and hints.',
    color: 'emerald',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Upload your resume and get AI-powered analysis with section-by-section scoring and actionable improvement tips.',
    color: 'purple',
  },
  {
    icon: Map,
    title: 'Learning Roadmaps',
    description: 'Personalized study plans based on your target role, current skills, and timeline to interview day.',
    color: 'amber',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed insights, skill radar charts, and comparison against target benchmarks.',
    color: 'cyan',
  },
  {
    icon: Brain,
    title: 'Adaptive AI Engine',
    description: 'Our AI adapts to your skill level in real-time, progressively challenging you as you improve.',
    color: 'pink',
  },
];

const testimonials = [
  {
    name: 'Arjun Patel',
    role: 'SDE at Google',
    text: 'Intervo\'s mock interviews felt incredibly real. The AI feedback on my system design answers was spot-on. Landed my dream job!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Frontend Dev at Microsoft',
    text: 'The coding practice section is phenomenal. The difficulty progression and hints helped me go from struggling with mediums to crushing hards.',
    rating: 5,
  },
  {
    name: 'Rahul Menon',
    role: 'SDE II at Amazon',
    text: 'The resume analyzer caught issues I never noticed. My callback rate went from 10% to over 60% after implementing the suggestions.',
    rating: 5,
  },
];

const steps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description: 'Sign up and tell us about your target role, skills, and timeline.',
  },
  {
    step: '02',
    title: 'Get Your Roadmap',
    description: 'Receive a personalized study plan tailored to your goals.',
  },
  {
    step: '03',
    title: 'Practice Daily',
    description: 'Take mock interviews, solve coding problems, and refine your resume.',
  },
  {
    step: '04',
    title: 'Land Your Dream Job',
    description: 'Go into your real interviews with confidence and proven skills.',
  },
];

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [usersCount, usersRef] = useCounter(12500);
  const [interviewsCount, interviewsRef] = useCounter(85000);
  const [placementRate, placementRef] = useCounter(94);
  const [problemsCount, problemsRef] = useCounter(500);

  return (
    <div className="overflow-hidden">
      {/* ─── Hero Section ────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="bg-orb w-[600px] h-[600px] bg-accent-blue top-1/4 -left-32" />
        <div className="bg-orb w-[500px] h-[500px] bg-accent-purple bottom-1/4 -right-32" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8"
            >
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium text-blue-300">AI-Powered Interview Preparation</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Ace your next
              <br />
              <span className="gradient-text">tech interview</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice with AI-powered mock interviews, sharpen your coding skills, 
              and get personalized feedback to land your dream tech job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Start Practicing Free
                </Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" size="lg">
                  See How It Works
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Floating stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Active Users', value: usersCount.toLocaleString() + '+', ref: usersRef, icon: Users },
              { label: 'Mock Interviews', value: interviewsCount.toLocaleString() + '+', ref: interviewsRef, icon: Mic },
              { label: 'Placement Rate', value: placementRate + '%', ref: placementRef, icon: Trophy },
              { label: 'Coding Problems', value: problemsCount + '+', ref: problemsRef, icon: Code2 },
            ].map((stat, i) => (
              <div
                key={i}
                ref={stat.ref}
                className="glass p-4 text-center"
              >
                <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to <span className="gradient-text">crack the interview</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A complete toolkit designed to prepare you for every aspect of the interview process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="bg-orb w-96 h-96 bg-accent-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How <span className="gradient-text">Intervo</span> works
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Four simple steps to go from preparation to placement.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className="glass p-6 h-full">
                  <span className="text-3xl font-bold gradient-text opacity-50 block mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-slate-700">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ────────────────────────────── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by <span className="gradient-text">thousands</span> of students
            </h2>
            <p className="text-slate-400">
              See what our users say about their interview preparation journey.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass p-8 sm:p-10 text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-slate-400">{testimonials[currentTestimonial].role}</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="p-2 rounded-full glass hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTestimonial
                        ? 'w-6 bg-blue-500'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-2 rounded-full glass hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-border p-10 sm:p-14 text-center relative overflow-hidden"
          >
            <div className="bg-orb w-64 h-64 bg-accent-blue -top-32 -right-32 opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to start your journey?
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Join thousands of students who've already landed their dream tech jobs with Intervo.
              </p>
              <Link to="/signup">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Inter<span className="gradient-text">vo</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-xs text-slate-600">
              © 2026 Intervo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
