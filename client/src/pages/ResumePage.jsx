import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const mockAnalysis = {
  overallScore: 82,
  sections: [
    { name: 'Contact Information', score: 95, status: 'excellent', tips: ['All essential contact details present'] },
    { name: 'Professional Summary', score: 85, status: 'good', tips: ['Add more quantifiable achievements', 'Tailor summary to specific role'] },
    { name: 'Work Experience', score: 78, status: 'good', tips: ['Use strong action verbs', 'Add impact metrics to bullet points', 'Include full tech stack'] },
    { name: 'Education', score: 90, status: 'excellent', tips: ['Well structured and formatted'] },
    { name: 'Skills', score: 70, status: 'needs_work', tips: ['Group skills by category', 'Prune outdated tools', 'Indicate key proficiencies'] },
    { name: 'Projects', score: 75, status: 'good', tips: ['Add live demo or GitHub links', 'Detail architecture decisions'] },
  ],
  improvements: [
    'Add 3-5 quantifiable achievements (e.g. reduced load times by 40%)',
    'Tailor your summary section for each specific application',
    'Organize skills into distinct categories (Languages, Frameworks, Tools)',
    'Add links to live projects or GitHub repositories',
    'Use active engineering verbs (Engineered, Optimized, Designed)',
    'Keep resume concise (1 page for early-career developers)',
  ],
};

const pastAnalyses = [];

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
    await new Promise((resolve) => setTimeout(resolve, 2000));
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

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Resume Analyzer
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Upload your resume in PDF format for automated ATS evaluation and improvement tips.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!analysis ? (
          <div key="upload" className="space-y-8">
            {/* Upload Box */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-10 rounded-xl border text-center transition-colors cursor-pointer ${
                isDragOver
                  ? 'border-[#d4684b] bg-[#d4684b]/5'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
              }`}
            >
              {!uploadedFile ? (
                <>
                  <div className="w-12 h-12 rounded-lg bg-white/[0.05] text-[#d4684b] flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">
                    Drag and drop your resume
                  </h3>
                  <p className="text-xs text-white/40 mb-4">
                    PDF files only • Max file size 5MB
                  </p>
                  <label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="inline-block bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium px-4 py-2 rounded-lg border border-white/[0.08] cursor-pointer transition-colors">
                      Browse File
                    </span>
                  </label>
                </>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#d4684b]/15 text-[#d4684b] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-white">{uploadedFile.name}</p>
                    <p className="text-[11px] text-white/30">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="p-1 rounded text-white/40 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {uploadedFile && (
              <Button
                variant="primary"
                size="md"
                loading={isAnalyzing}
                onClick={analyzeResume}
              >
                {isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume'}
              </Button>
            )}

            {/* Past Analyses */}
            <div className="pt-4 border-t border-white/[0.06]">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                Analysis History
              </h2>
              {pastAnalyses.length === 0 ? (
                <div className="p-8 text-center border border-white/[0.06] rounded-xl bg-white/[0.01]">
                  <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-xs text-white/40">No previous resume evaluations.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pastAnalyses.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAnalysis(mockAnalysis)}
                      className="w-full p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-left hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#d4684b]" />
                        <div>
                          <p className="text-xs font-medium text-white">{item.name}</p>
                          <p className="text-[11px] text-white/30">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-white">{item.score}</span>
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Results UI */
          <div key="results" className="space-y-6">
            <button
              onClick={() => setAnalysis(null)}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              ← Back to Upload
            </button>

            {/* Score */}
            <div className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
              <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-wider">Overall ATS Match Score</p>
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke="#d4684b"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - analysis.overallScore / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white tracking-tight">
                    {analysis.overallScore}
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium text-emerald-400">Above Average Match</p>
            </div>

            {/* Section Breakdown */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                Section Breakdown
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {analysis.sections.map((section) => (
                  <div
                    key={section.name}
                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-medium text-white">{section.name}</h3>
                      <Badge size="sm" color={getStatusColor(section.status)}>
                        {getStatusLabel(section.status)}
                      </Badge>
                    </div>
                    <ProgressBar value={section.score} max={100} size="sm" showValue={false} />
                    <ul className="mt-3 space-y-1">
                      {section.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-[11px] text-white/40">
                          {section.status === 'excellent' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-[#d4684b]" />
                <h2 className="text-sm font-medium text-white">Recommended Improvements</h2>
              </div>
              <div className="space-y-2">
                {analysis.improvements.map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01]"
                  >
                    <span className="w-4 h-4 rounded bg-white/[0.06] flex items-center justify-center text-[10px] font-mono text-white/60 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
