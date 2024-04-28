import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

const GaugeChart = ({ dataColors }) => {

  const staticValue = 50; // Static value for the needle indicator

  // const [value, setValue] = useState(0); // Initial value

  // Simulate data update
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((prevValue) => (prevValue < 100 ? prevValue + 1 : 0)); // Increment value (reset to 0 if it reaches 100)
  //   }, 1000); // Update interval in milliseconds

  //   return () => clearInterval(interval);
  // }, []);

  var option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    color: ["#405189"], //blue color
    textStyle: {
      fontFamily: "Poppins, sans-serif",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          color: "#858d98",
        },
        axisLabel: {
          color: "#858d98",
        },
        data: [
          {
            title: {
              color: "#858d98", //score 
            },
            // value: value, // Use the dynamic value here
            value: staticValue, // Use the static value here
            name: "SCORE",
          },
        ],
        axisLine: {
          lineStyle: {
            color: [
              [0.5, "#405189"], // blue Color at 30%
              [1, "#e74c3c"], // red Color at 70%
            ],
            width: 10,
            shadowColor: "#fff", // Default is #000
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
        splitLine: {
          length: 10,
          lineStyle: {
            color: "auto",
          },
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <ReactEcharts
        style={{ width: "400px", height: "400px" }}
        option={option}
      />
    </React.Fragment>
  );
};

export default GaugeChart;
