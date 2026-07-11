import { Mic, Code2, FileText, BookOpen, Clock, Inbox } from 'lucide-react';

const activityIcons = {
  interview: Mic,
  coding: Code2,
  resume: FileText,
  roadmap: BookOpen,
};

const activityColors = {
  interview: 'text-[#d4684b] bg-[#d4684b]/10',
  coding: 'text-emerald-400 bg-emerald-500/10',
  resume: 'text-[#e88d72] bg-[#e88d72]/10',
  roadmap: 'text-amber-400 bg-amber-500/10',
};

export default function ActivityFeed({ activities = [] }) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
          <Inbox className="w-6 h-6 text-slate-600" />
        </div>
        <p className="text-sm text-slate-500 mb-1">No activity yet</p>
        <p className="text-xs text-slate-600">
          Start practicing to see your progress here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const Icon = activityIcons[activity.type] || Code2;
        const colorClass = activityColors[activity.type] || 'text-slate-400 bg-slate-500/10';

        return (
          <div
            key={activity.id || index}
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
            {activity.time && (
              <div className="flex items-center gap-1 text-xs text-slate-600 flex-shrink-0">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
