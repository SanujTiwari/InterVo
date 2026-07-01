import { Mic, Code2, FileText, BookOpen, CheckCircle2, Clock } from 'lucide-react';

const activityIcons = {
  interview: Mic,
  coding: Code2,
  resume: FileText,
  roadmap: BookOpen,
};

const activityColors = {
  interview: 'text-blue-400 bg-blue-500/10',
  coding: 'text-emerald-400 bg-emerald-500/10',
  resume: 'text-purple-400 bg-purple-500/10',
  roadmap: 'text-amber-400 bg-amber-500/10',
};

const mockActivities = [
  {
    id: 1,
    type: 'interview',
    title: 'Completed Technical Interview',
    detail: 'React & System Design • Score: 85/100',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'coding',
    title: 'Solved "Two Sum"',
    detail: 'Arrays • Easy • Runtime: 98th percentile',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'resume',
    title: 'Resume Analysis Complete',
    detail: 'Score improved to 82/100',
    time: 'Yesterday',
  },
  {
    id: 4,
    type: 'coding',
    title: 'Solved "LRU Cache"',
    detail: 'Design • Medium • 3 attempts',
    time: 'Yesterday',
  },
  {
    id: 5,
    type: 'interview',
    title: 'Behavioral Interview Practice',
    detail: 'STAR Method • Score: 78/100',
    time: '2 days ago',
  },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-1">
      {mockActivities.map((activity, index) => {
        const Icon = activityIcons[activity.type] || CheckCircle2;
        const colorClass = activityColors[activity.type] || 'text-slate-400 bg-slate-500/10';

        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                {activity.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{activity.detail}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-600 flex-shrink-0">
              <Clock className="w-3 h-3" />
              {activity.time}
            </div>
          </div>
        );
      })}
    </div>
  );
}
