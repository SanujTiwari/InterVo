import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  TrendingUp,
  Star,
  Clock,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const mockAnalysis = {
  overallScore: 82,
  sections: [
    { name: 'Contact Information', score: 95, status: 'excellent', tips: ['All essential info present'] },
    { name: 'Professional Summary', score: 85, status: 'good', tips: ['Add more quantifiable achievements', 'Make it more role-specific'] },
    { name: 'Work Experience', score: 78, status: 'good', tips: ['Use more action verbs', 'Add metrics to 3 bullet points', 'Include technologies used'] },
    { name: 'Education', score: 90, status: 'excellent', tips: ['Well structured and complete'] },
    { name: 'Skills', score: 70, status: 'needs_work', tips: ['Organize by category', 'Remove outdated technologies', 'Add proficiency levels'] },
    { name: 'Projects', score: 75, status: 'good', tips: ['Add deployment links', 'Mention tech stack for each project', 'Highlight impact/results'] },
  ],
  improvements: [
    'Add 3-5 quantifiable achievements in your work experience',
    'Include a tailored professional summary for each application',
    'Organize skills into categories (Languages, Frameworks, Tools)',
    'Add links to live projects or GitHub repositories',
    'Use stronger action verbs (Engineered, Optimized, Architected)',
    'Reduce resume to 1 page for early-career positions',
  ],
};

const pastAnalyses = [
  { id: 1, name: 'Resume_v3.pdf', score: 82, date: 'Jun 28, 2026' },
  { id: 2, name: 'Resume_v2.pdf', score: 71, date: 'Jun 15, 2026' },
  { id: 3, name: 'Resume_v1.pdf', score: 58, date: 'May 30, 2026' },
];

export default function ResumePage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      setUploadedFile(file);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status) => {
    if (status === 'excellent') return 'green';
    if (status === 'good') return 'blue';
    return 'yellow';
  };

  const getStatusLabel = (status) => {
    if (status === 'excellent') return 'Excellent';
    if (status === 'good') return 'Good';
    return 'Needs Work';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-teal-500';
    if (score >= 60) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Resume Analyzer</h1>
        <p className="text-slate-400">
          Upload your resume and get AI-powered feedback to stand out.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!analysis ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`glass p-10 text-center transition-all duration-300 cursor-pointer ${
                isDragOver
                  ? 'border-blue-500/40 bg-blue-500/5 shadow-glow-blue'
                  : 'hover:border-white/10'
              }`}
            >
              {!uploadedFile ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
                    <Upload className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Drop your resume here
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    or click to browse • PDF format • Max 5MB
                  </p>
                  <label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="btn-secondary text-sm cursor-pointer">
                      Browse Files
                    </span>
                  </label>
                </>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{uploadedFile.name}</p>
                    <p className="text-xs text-slate-500">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {uploadedFile && (
              <Button
                variant="primary"
                size="lg"
                loading={isAnalyzing}
                onClick={analyzeResume}
                className="w-full sm:w-auto"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              </Button>
            )}

            {/* Past Analyses */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Analysis History</h2>
              <div className="space-y-3">
                {pastAnalyses.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnalysis(mockAnalysis)}
                    className="w-full glass p-4 flex items-center gap-4 text-left hover:border-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        item.score >= 80 ? 'text-emerald-400' : item.score >= 60 ? 'text-amber-400' : 'text-red-400'
                      }`}>{item.score}</p>
                      <p className="text-xs text-slate-600">score</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Analysis Results */
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <Button variant="ghost" onClick={() => setAnalysis(null)} className="mb-2">
              ← Back to Upload
            </Button>

            {/* Overall Score */}
            <div className="glass p-8 text-center">
              <p className="text-sm text-slate-400 mb-4">Overall Resume Score</p>
              <div className="relative w-36 h-36 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 52 * (1 - analysis.overallScore / 100),
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-white"
                  >
                    {analysis.overallScore}
                  </motion.span>
                </div>
              </div>
              <p className="text-emerald-400 font-medium">Good — Above average</p>
            </div>

            {/* Section Breakdown */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Section Breakdown</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {analysis.sections.map((section, i) => (
                  <motion.div
                    key={section.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">{section.name}</h3>
                      <Badge size="sm" color={getStatusColor(section.status)}>
                        {getStatusLabel(section.status)}
                      </Badge>
                    </div>
                    <ProgressBar
                      value={section.score}
                      max={100}
                      size="sm"
                    />
                    <ul className="mt-3 space-y-1.5">
                      {section.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                          {section.status === 'excellent' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          )}
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="glass p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Key Improvements</h2>
              </div>
              <div className="space-y-3">
                {analysis.improvements.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-300">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
