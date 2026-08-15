import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Timer,
  Play,
  RotateCcw,
  ChevronRight,
  Brain,
  Code2,
  Users,
  Server,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const interviewTypes = [
  {
    id: 'technical',
    title: 'Technical',
    description: 'Data structures, algorithms, and technical concepts',
    icon: Code2,
  },
  {
    id: 'behavioral',
    title: 'Behavioral',
    description: 'STAR framework, situational, and soft-skill questions',
    icon: Users,
  },
  {
    id: 'hr',
    title: 'HR Round',
    description: 'Culture fit, career trajectory, and salary expectations',
    icon: Brain,
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Scalable architecture, trade-offs, and microservices',
    icon: Server,
  },
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const pastInterviews = [];

const mockQuestions = [
  "Tell me about a complex technical problem you solved recently. Walk me through your approach.",
  "How would you design a real-time notification system that handles millions of users?",
  "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?",
];

export default function MockInterviewPage() {
  const { refreshProfile } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0);

  const startInterview = () => {
    if (!selectedType) return;
    setIsInterviewing(true);
    setCurrentQuestion(0);
    setTimer(0);
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    window._interviewTimer = interval;
  };

  const endInterview = () => {
    setIsInterviewing(false);
    if (window._interviewTimer) clearInterval(window._interviewTimer);
  };

  const finishInterview = async () => {
    setIsInterviewing(false);
    if (window._interviewTimer) clearInterval(window._interviewTimer);

    const simulatedScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70;

    try {
      await api.post('/users/profile/interview', { score: simulatedScore });
      await refreshProfile();
      alert(`Interview completed! Score: ${simulatedScore}% (+100 XP)`);
    } catch (err) {
      console.error('Error saving interview statistics:', err);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Mock Interviews
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Practice interactive interviews with AI feedback and real-time guidance.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isInterviewing ? (
          <div key="setup" className="space-y-8">
            {/* Interview Type Selection */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                1. Select Interview Type
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {interviewTypes.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-[#d4684b] bg-white/[0.04]'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-[#d4684b] text-white'
                              : 'bg-white/[0.05] text-white/50'
                          }`}
                        >
                          <type.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white mb-0.5">
                            {type.title}
                          </h3>
                          <p className="text-xs text-white/35 leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                2. Select Difficulty
              </h2>
              <div className="flex gap-2">
                {difficulties.map((diff) => {
                  const isSelected = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'border-[#d4684b] bg-[#d4684b]/15 text-[#d4684b]'
                          : 'border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white hover:border-white/[0.12]'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Button */}
            <div>
              <Button
                variant="primary"
                size="md"
                icon={Play}
                onClick={startInterview}
                disabled={!selectedType}
              >
                Start Practice Session
              </Button>
            </div>

            {/* Past Interviews */}
            <div className="pt-4 border-t border-white/[0.06]">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                Interview History
              </h2>
              {pastInterviews.length === 0 ? (
                <div className="p-8 text-center border border-white/[0.06] rounded-xl bg-white/[0.01]">
                  <Mic className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-xs text-white/40">No past sessions recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pastInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center font-semibold text-sm">
                          <span className={getScoreColor(interview.score)}>
                            {interview.score}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{interview.topic}</p>
                          <p className="text-xs text-white/30">{interview.type} • {interview.date}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Active Interview UI */
          <div key="interview" className="space-y-6">
            {/* Header */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#d4684b] animate-pulse" />
                <span className="text-xs font-medium text-white">Live Practice Session</span>
                <Badge color="yellow" size="sm">
                  {interviewTypes.find((t) => t.id === selectedType)?.title}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
                  <Timer className="w-3.5 h-3.5" />
                  <span>{formatTime(timer)}</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60 hover:text-white"
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Question */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[11px] font-semibold text-[#d4684b] uppercase tracking-wider mb-2 block">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
              <p className="text-base text-white/90 leading-relaxed font-medium">
                {mockQuestions[currentQuestion]}
              </p>
            </div>

            {/* Answer Box */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <h3 className="text-xs font-medium text-white/40 mb-2">Your Answer</h3>
              <textarea
                placeholder="Type your answer here or record your response..."
                className="w-full h-36 bg-transparent text-sm text-white placeholder-white/20 outline-none resize-none"
              />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Clarity', value: 72 },
                { label: 'Technical Depth', value: 65 },
                { label: 'Relevance', value: 88 },
              ].map((metric) => (
                <div key={metric.label} className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <p className="text-[11px] text-white/40 mb-1">{metric.label}</p>
                  <p className="text-base font-semibold text-white">{metric.value}%</p>
                  <div className="w-full h-1 bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#d4684b] rounded-full"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {currentQuestion < mockQuestions.length - 1 ? (
                <Button
                  variant="primary"
                  icon={ChevronRight}
                  onClick={() => setCurrentQuestion((q) => q + 1)}
                >
                  Next Question
                </Button>
              ) : (
                <Button variant="primary" icon={CheckCircle2} onClick={finishInterview}>
                  Finish Interview
                </Button>
              )}
              <Button variant="secondary" icon={RotateCcw} onClick={endInterview}>
                End Session
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
