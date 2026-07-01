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

export default function PerformanceChart() {
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
        data: [78, 65, 55, 82, 88, 72],
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#3b82f6',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Target',
        data: [85, 80, 75, 90, 90, 85],
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
        borderColor: 'rgba(139, 92, 246, 0.4)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#8b5cf6',
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
        backgroundColor: 'rgba(17, 25, 40, 0.9)',
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
