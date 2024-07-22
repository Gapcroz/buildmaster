// PieChartComponent.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#ed5761",
  "#124654",
  "#dbc251",
  "#00a08F",
  "#ffb134",
  "#d3bca0",
];

const PieChartComponent = ({ data }) => {
  const pieData = data.map((item) => ({
    name: item.week,
    value: item.realProgress,
  }));

  return (
    <PieChart width={600} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
