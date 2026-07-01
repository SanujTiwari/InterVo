import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, color, index = 0 }) {
  const colorClasses = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'hover:border-blue-500/30' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'hover:border-purple-500/30' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'hover:border-cyan-500/30' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'hover:border-emerald-500/30' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'hover:border-amber-500/30' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'hover:border-pink-500/30' },
  };

  const c = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass glass-hover group cursor-default p-6 ${c.border}`}
    >
      <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${c.text}`} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
