// src/components/dashboard/CareerSnapshot.jsx
import React, { useRef, useMemo } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import domToImage from "dom-to-image"; // install via npm if needed

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function CareerSnapshot({
  skills = ["React", "Node.js", "Python", "AWS", "SQL", "Prompt Engineering"],
  values = [80, 65, 70, 50, 75, 60],
  benchmarks = [90, 70, 80, 60, 85, 70]
}) {
  const chartRef = useRef();

  // Build gradient fill
  const gradient = useMemo(() => {
    const ctx = chartRef.current?.ctx;
    if (!ctx) return "rgba(99, 102, 241, 0.2)";
    const g = ctx.createLinearGradient(0, 0, 0, 200);
    g.addColorStop(0, "rgba(99, 102, 241, 0.4)");
    g.addColorStop(1, "rgba(99, 102, 241, 0.1)");
    return g;
  }, [chartRef]);

  const data = useMemo(() => ({
    labels: skills,
    datasets: [
      {
        label: "You",
        data: values,
        backgroundColor: gradient,
        borderColor: "rgba(99,102,241,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(99,102,241,1)",
        pointRadius: 4,
        fill: true,
      },
      {
        label: "Benchmark",
        data: benchmarks,
        backgroundColor: "rgba(16,185,129,0.2)",
        borderColor: "rgba(16,185,129,1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(16,185,129,1)",
        pointRadius: 3,
        borderDash: [5, 5],
      },
    ],
  }), [skills, values, benchmarks, gradient]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      r: {
        grid: {
          color: "rgba(200,200,200,0.3)",
          lineWidth: 1
        },
        angleLines: {
          color: "rgba(200,200,200,0.5)"
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          color: "#6B7280", // gray-500
          backdropColor: "transparent",
          font: { size: 10 }
        },
        pointLabels: {
          color: "#374151", // gray-700
          font: { size: 12, weight: "500" }
        }
      }
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          boxWidth: 12,
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: "#1F2937", // gray-800
        titleColor: "#F9FAFB", // gray-50
        bodyColor: "#D1D5DB", // gray-300
        padding: 8,
        cornerRadius: 4
      }
    }
  };

  const downloadImage = () => {
    if (!chartRef.current) return;
    domToImage.toPng(chartRef.current.canvas)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "career-snapshot.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Career Snapshot
        </h3>
        <button
          onClick={downloadImage}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-500 transition"
        >
          Download
        </button>
      </div>
      <div className="relative w-full h-72">
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
