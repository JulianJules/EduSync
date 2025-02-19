import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const HomeworkChart = () => {
  // Example data to show homework completion
  const homeworkData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Homework Completion',
        data: [8, 2], // 8 tasks completed, 2 tasks pending (adjust as needed)
        backgroundColor: ['#4caf50', '#f44336'], // Green for completed, red for pending
        borderColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} tasks`,
        },
      },
    },
  };

  return (
    <div className="homework-chart">
      <h3>Homework Completion</h3>
      <Pie data={homeworkData} options={options} />
    </div>
  );
};

export default HomeworkChart;
