// src/components/dashboard/CareerSnapshot.jsx
import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ["React", "Node.js", "Python", "AWS", "SQL", "Prompt Engineering"],
  datasets: [
    {
      label: "Your Skill Level",
      data: [80, 65, 70, 50, 75, 60],
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    r: {
      angleLines: { display: false },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

export default function CareerSnapshot() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Snapshot</h3>
      <Radar data={data} options={options} />
    </div>
  );
}
