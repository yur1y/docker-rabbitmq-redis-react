import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
// Register Chart.js modules
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);
const NeoStatsChart = ({ dateCounts }) => {
  const dates = Object.keys(dateCounts).sort();
  const counts = Object.values(dateCounts);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Number of NEOs",
        data: counts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return <Line data={chartData} />;
};
export default NeoStatsChart;
