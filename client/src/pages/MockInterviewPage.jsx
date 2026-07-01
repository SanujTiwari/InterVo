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
  Star,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const interviewTypes = [
  {
    id: 'technical',
    title: 'Technical',
    description: 'Data structures, algorithms, and system design questions',
    icon: Code2,
    color: 'blue',
    gradient: 'from-blue-600 to-blue-500',
  },
  {
    id: 'behavioral',
    title: 'Behavioral',
    description: 'STAR method, leadership, and situational questions',
    icon: Users,
    color: 'purple',
    gradient: 'from-purple-600 to-purple-500',
  },
  {
    id: 'hr',
    title: 'HR Round',
    description: 'Salary negotiation, culture fit, and career goals',
    icon: Brain,
    color: 'emerald',
    gradient: 'from-emerald-600 to-emerald-500',
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Scalable architecture, distributed systems, and trade-offs',
    icon: Server,
    color: 'amber',
    gradient: 'from-amber-600 to-amber-500',
  },
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const pastInterviews = [
  {
    id: 1,
    type: 'Technical',
    topic: 'React & State Management',
    score: 85,
    date: 'Jun 28, 2026',
    duration: '28 min',
    difficulty: 'Medium',
  },
  {
    id: 2,
    type: 'Behavioral',
    topic: 'Leadership & Teamwork',
    score: 92,
    date: 'Jun 26, 2026',
    duration: '22 min',
    difficulty: 'Easy',
  },
  {
    id: 3,
    type: 'System Design',
    topic: 'Design a URL Shortener',
    score: 68,
    date: 'Jun 24, 2026',
    duration: '42 min',
    difficulty: 'Hard',
  },
  {
    id: 4,
    type: 'Technical',
    topic: 'Binary Trees & Graphs',
    score: 78,
    date: 'Jun 22, 2026',
    duration: '35 min',
    difficulty: 'Medium',
  },
];

const mockQuestions = [
  "Tell me about a complex technical problem you solved recently. Walk me through your approach.",
  "How would you design a real-time notification system that handles millions of users?",
  "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?",
];

export default function MockInterviewPage() {
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
    // Start timer
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    // Store interval id for cleanup
    window._interviewTimer = interval;
  };

  const endInterview = () => {
    setIsInterviewing(false);
    if (window._interviewTimer) clearInterval(window._interviewTimer);
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Mock Interviews</h1>
        <p className="text-slate-400">
          Practice with AI interviewers and get instant, actionable feedback.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isInterviewing ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Interview Type Selection */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Choose Interview Type</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {interviewTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`glass p-5 text-left transition-all duration-200 ${
                      selectedType === type.id
                        ? 'border-blue-500/30 bg-blue-500/5 shadow-glow-blue'
                        : 'hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                        <type.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{type.title}</h3>
                        <p className="text-xs text-slate-400">{type.description}</p>
                      </div>
                    </div>
                    {selectedType === type.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Select Difficulty</h2>
              <div className="flex gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedDifficulty === diff
                        ? diff === 'Easy'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : diff === 'Medium'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : 'glass text-slate-400 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button
              variant="primary"
              size="lg"
              icon={Play}
              onClick={startInterview}
              disabled={!selectedType}
              className="w-full sm:w-auto"
            >
              Start Interview
            </Button>

            {/* Past Interviews */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Interview History</h2>
              <div className="space-y-3">
                {pastInterviews.map((interview) => (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-4 flex items-center gap-4 group hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
                      <span className={`text-lg font-bold ${getScoreColor(interview.score)}`}>
                        {interview.score}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-white truncate">{interview.topic}</p>
                        <Badge
                          size="sm"
                          color={
                            interview.difficulty === 'Easy'
                              ? 'green'
                              : interview.difficulty === 'Medium'
                              ? 'yellow'
                              : 'red'
                          }
                        >
                          {interview.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{interview.type}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {interview.duration}
                        </span>
                        <span>•</span>
                        <span>{interview.date}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Interview UI */
          <motion.div
            key="interview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Interview Header */}
            <div className="glass p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium text-white">Live Interview</span>
                <Badge color="blue" size="sm">
                  {interviewTypes.find((t) => t.id === selectedType)?.title}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm font-mono font-medium">{formatTime(timer)}</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-lg transition-colors ${
                    isMuted ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Question Display */}
            <Card hover={false} className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                {mockQuestions[currentQuestion]}
              </p>
            </Card>

            {/* Answer Area */}
            <div className="glass p-6">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Your Answer</h3>
              <textarea
                placeholder="Type your answer here, or use the microphone to speak..."
                className="w-full h-40 bg-transparent text-white placeholder-slate-600 outline-none resize-none text-sm leading-relaxed"
              />
            </div>

            {/* AI Feedback Indicators */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Clarity', value: 72, color: 'from-blue-500 to-cyan-500' },
                { label: 'Depth', value: 65, color: 'from-purple-500 to-pink-500' },
                { label: 'Relevance', value: 88, color: 'from-emerald-500 to-teal-500' },
              ].map((metric) => (
                <div key={metric.label} className="glass-light p-3 text-center">
                  <p className="text-xs text-slate-500 mb-1">{metric.label}</p>
                  <p className="text-lg font-bold text-white">{metric.value}%</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
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
                <Button variant="primary" icon={CheckCircle2} onClick={endInterview}>
                  Finish Interview
                </Button>
              )}
              <Button variant="secondary" icon={RotateCcw} onClick={endInterview}>
                End Early
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
