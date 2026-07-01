import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  ChevronRight,
  Code2,
  Bookmark,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';

const topics = [
  'All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs',
  'Dynamic Programming', 'Sorting', 'Binary Search', 'Stack', 'Queue', 'Heap',
];

const problems = [
  { id: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', solved: true, acceptance: '49.2%', likes: 23400 },
  { id: 2, title: 'Add Two Numbers', topic: 'Linked Lists', difficulty: 'Medium', solved: true, acceptance: '40.1%', likes: 18200 },
  { id: 3, title: 'Longest Substring Without Repeating', topic: 'Strings', difficulty: 'Medium', solved: false, acceptance: '33.8%', likes: 20100 },
  { id: 4, title: 'Median of Two Sorted Arrays', topic: 'Arrays', difficulty: 'Hard', solved: false, acceptance: '36.1%', likes: 15600 },
  { id: 5, title: 'Valid Parentheses', topic: 'Stack', difficulty: 'Easy', solved: true, acceptance: '42.3%', likes: 12800 },
  { id: 6, title: 'Merge Two Sorted Lists', topic: 'Linked Lists', difficulty: 'Easy', solved: true, acceptance: '61.8%', likes: 11200 },
  { id: 7, title: 'Maximum Subarray', topic: 'Dynamic Programming', difficulty: 'Medium', solved: false, acceptance: '49.6%', likes: 19500 },
  { id: 8, title: 'Binary Tree Inorder Traversal', topic: 'Trees', difficulty: 'Easy', solved: true, acceptance: '73.2%', likes: 8900 },
  { id: 9, title: 'LRU Cache', topic: 'Design', difficulty: 'Medium', solved: false, acceptance: '40.3%', likes: 14700 },
  { id: 10, title: 'Merge Intervals', topic: 'Sorting', difficulty: 'Medium', solved: true, acceptance: '45.7%', likes: 13400 },
  { id: 11, title: 'Course Schedule', topic: 'Graphs', difficulty: 'Medium', solved: false, acceptance: '45.4%', likes: 9800 },
  { id: 12, title: 'Trapping Rain Water', topic: 'Dynamic Programming', difficulty: 'Hard', solved: false, acceptance: '58.8%', likes: 16300 },
];

const difficultyColor = {
  Easy: 'green',
  Medium: 'yellow',
  Hard: 'red',
};

export default function CodingPracticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const filtered = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTopic = selectedTopic === 'All' || p.topic === selectedTopic;
    const matchDifficulty = !selectedDifficulty || p.difficulty === selectedDifficulty;
    return matchSearch && matchTopic && matchDifficulty;
  });

  const solvedCount = problems.filter((p) => p.solved).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Coding Practice</h1>
        <p className="text-slate-400">
          Sharpen your problem-solving skills with curated challenges.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircle2}
          label="Problems Solved"
          value={`${solvedCount}/${problems.length}`}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Acceptance Rate"
          value="68%"
          change="+4% this week"
          changeType="positive"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          icon={Clock}
          label="Avg. Solve Time"
          value="18 min"
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
        />
        <StatCard
          icon={BarChart3}
          label="Current Streak"
          value="5 days"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <div className="flex gap-2">
            {['Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() =>
                  setSelectedDifficulty(selectedDifficulty === diff ? null : diff)
                }
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
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

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTopic === topic
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Problem List & Detail */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Problem List */}
        <div className="lg:col-span-3 space-y-2">
          {filtered.map((problem, index) => (
            <motion.button
              key={problem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedProblem(problem)}
              className={`w-full glass p-4 flex items-center gap-4 text-left transition-all duration-200 ${
                selectedProblem?.id === problem.id
                  ? 'border-blue-500/30 bg-blue-500/5'
                  : 'hover:border-white/10'
              }`}
            >
              <div className="flex-shrink-0">
                {problem.solved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-mono">#{problem.id}</span>
                  <span className="text-sm font-medium text-white truncate">
                    {problem.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">{problem.topic}</span>
                  <span className="text-xs text-slate-700">•</span>
                  <span className="text-xs text-slate-500">{problem.acceptance}</span>
                </div>
              </div>
              <Badge size="sm" color={difficultyColor[problem.difficulty]}>
                {problem.difficulty}
              </Badge>
            </motion.button>
          ))}

          {filtered.length === 0 && (
            <div className="glass p-10 text-center">
              <Code2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No problems match your filters.</p>
            </div>
          )}
        </div>

        {/* Problem Detail / Code Editor Area */}
        <div className="lg:col-span-2">
          {selectedProblem ? (
            <motion.div
              key={selectedProblem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 sticky top-24 space-y-5"
            >
              <div className="flex items-center justify-between">
                <Badge size="md" color={difficultyColor[selectedProblem.difficulty]}>
                  {selectedProblem.difficulty}
                </Badge>
                <button className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {selectedProblem.title}
                </h2>
                <p className="text-sm text-slate-500">{selectedProblem.topic}</p>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  Given an array of integers <code className="px-1.5 py-0.5 rounded bg-white/5 text-blue-400 text-xs">nums</code> and 
                  an integer <code className="px-1.5 py-0.5 rounded bg-white/5 text-blue-400 text-xs">target</code>, return 
                  indices of the two numbers such that they add up to target.
                </p>
                <p>
                  You may assume that each input would have exactly one solution, and you 
                  may not use the same element twice.
                </p>
              </div>

              {/* Example */}
              <div className="rounded-xl bg-navy-950/60 border border-white/5 p-4">
                <p className="text-xs text-slate-500 mb-2">Example:</p>
                <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
{`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9`}
                </pre>
              </div>

              {/* Code Editor Placeholder */}
              <div className="rounded-xl bg-navy-950/80 border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-500 ml-2">solution.js</span>
                </div>
                <textarea
                  placeholder="// Write your solution here..."
                  className="w-full h-48 bg-transparent text-sm text-slate-300 font-mono p-4 outline-none resize-none placeholder-slate-700"
                  defaultValue={`function twoSum(nums, target) {\n  // Your code here\n  \n}`}
                />
              </div>

              <div className="flex gap-3">
                <button className="btn-primary flex-1 text-sm py-2.5">
                  Run Code
                </button>
                <button className="btn-secondary flex-1 text-sm py-2.5">
                  Submit
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="glass p-10 text-center sticky top-24">
              <Code2 className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Select a problem to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
