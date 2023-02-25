import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function TodayCaloriesConsumed({ width, config }) {
  const data = [
    { name: "P1", value: 200, fill: "#FF73F8" },
    { name: "P2", value: 250, fill: "#00E0FC" },
    { name: "P3", value: 230, fill: "#FF5E54" },
  ];

  const state = {
    series: config.map((c) => {
      return c.value;
    }),
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      fill: {
        colors: config.map((c) => {
          return c.color;
        }),
      },
      labels: config.map((c) => {
        return c.label;
      }),
    },
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="radialBar"
      width={width}
    />
  );
}

export default TodayCaloriesConsumed;
