import { motion } from 'framer-motion';

export default function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'positive',
  iconColor = 'text-blue-400',
  iconBg = 'bg-blue-500/10',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass glass-hover p-5"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={`text-xs font-medium ${
                changeType === 'positive'
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
}
