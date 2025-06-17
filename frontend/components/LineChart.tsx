"use client";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
  datasets: [
    {
      label: "Notas Validadas",
      data: [10, 20, 15, 30, 25, 35, 40],
      borderColor: "#0ea5e9",
      backgroundColor: "#0ea5e933",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Notas com Erro",
      data: [2, 5, 8, 4, 10, 7, 5],
      borderColor: "#a855f7",
      backgroundColor: "#a855f733",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export default function LineChart() {
  return <Line data={data} options={options} />;
}