import React from "react";
import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./styles.modules.css";

const Charts = ({ dates, calories }) => {
  const { t, i18n } = useTranslation();

  if (!dates || !calories || dates.length === 0 || calories.length === 0) {
    return <p>No data available for chart</p>;
  }

  const chartData = dates.map((date, index) => ({ date, calories: calories[index] }));

  return (
    <div className="chart-container">
      <LineChart width={600} height={300} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "1px solid #d5d5d5" }} />
        <Legend />
        <Line type="monotone" dataKey="calories" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Charts;