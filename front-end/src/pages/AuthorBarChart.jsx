import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AuthorBarChart = ({ authorStats }) => {
  const labels = authorStats.map((author) => author.authorName);
  const dataCounts = authorStats.map((author) => author.totalPosts);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Posts',
        data: dataCounts,
        backgroundColor: 'rgba(99, 102, 241, 0.7)', // Tailwind indigo-500
        borderRadius: 8,
        barThickness: 40,
        hoverBackgroundColor: 'rgba(79, 70, 229, 0.9)', // Tailwind indigo-700
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#4B5563', // Tailwind gray-600
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)', // Tailwind gray-800
        titleColor: '#ffffff',
        bodyColor: '#f3f4f6', // gray-100
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6B7280', // gray-500
          font: {
            weight: '600',
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB', // gray-200
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg mb-10">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">📊 Posts per Author</h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AuthorBarChart;
