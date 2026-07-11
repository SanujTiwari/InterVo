import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { BarChart3 } from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

export default function PerformanceChart({ scores }) {
  // If no real scores are provided, show empty state
  const hasData = scores && Object.values(scores).some(v => v > 0);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
          <BarChart3 className="w-6 h-6 text-slate-600" />
        </div>
        <p className="text-sm text-slate-500 mb-1">No skill data yet</p>
        <p className="text-xs text-slate-600">
          Complete interviews and coding challenges to build your skill radar.
        </p>
      </div>
    );
  }

  const data = {
    labels: [
      'Data Structures',
      'Algorithms',
      'System Design',
      'Behavioral',
      'Communication',
      'Problem Solving',
    ],
    datasets: [
      {
        label: 'Your Score',
        data: [
          scores.dataStructures || 0,
          scores.algorithms || 0,
          scores.systemDesign || 0,
          scores.behavioral || 0,
          scores.communication || 0,
          scores.problemSolving || 0,
        ],
        backgroundColor: 'rgba(212, 104, 75, 0.15)',
        borderColor: 'rgba(212, 104, 75, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: '#d4684b',
        pointBorderColor: '#d4684b',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Target',
        data: [85, 80, 75, 90, 90, 85],
        backgroundColor: 'rgba(232, 141, 114, 0.08)',
        borderColor: 'rgba(232, 141, 114, 0.4)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointBackgroundColor: '#e88d72',
        pointBorderColor: '#e88d72',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        pointLabels: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 11,
          },
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}
