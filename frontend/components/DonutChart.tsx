"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Importados", "Nacionais", "Bonificados"],
  datasets: [
    {
      label: "Entradas",
      data: [30, 50, 20],
      backgroundColor: ["#3b82f6", "#0d9488", "#8b5cf6"],
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: "70%",
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export default function DonutChart() {
  return <Doughnut data={data} options={options} />;
}