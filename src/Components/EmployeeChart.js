import React, { useState } from "react";
import Chart from "react-apexcharts";

const EmployeeChart = ({ employeeList }) => {
  const [chartType, setChartType] = useState("pie"); // Default chart type is "pie"

  // Fallback to empty data if employeeList is undefined or empty
  if (!employeeList || employeeList.length === 0) {
    return <p>No employee data available.</p>;
  }

  // Count number of employees per designation
  const designationCounts = employeeList.reduce((acc, emp) => {
    if (emp && emp.designation) {
      acc[emp.designation] = (acc[emp.designation] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(designationCounts);
  const data = Object.values(designationCounts);

  // Format series data correctly for line and bar charts
  const series = [
    {
      name: "Employee Designations", // Label for line/bar chart
      data: data,
    },
  ];

  // Ensure yaxis is initialized properly, avoid undefined issues
  const getYAxisConfig = () => {
    if (chartType === "line") {
      return {
        title: { text: "Number of Employees" },
        min: 0,
      };
    }
    return {}; // For other chart types, return an empty object
  };

  const chartData = {
    series,
    options: {
      chart: {
        type: chartType, // Dynamically set the chart type
      },
      title: {
        text: "Designation Wise Distribution",
        align: "center",
      },
      labels, // For Pie Chart
      xaxis: chartType === "bar" ? { categories: labels } : undefined, // X-axis for Bar chart
      yaxis: getYAxisConfig(), // Set y-axis configuration dynamically
      tooltip: {
        enabled: true, // Ensure tooltip is enabled
        theme: "light", // Tooltip theme
        x: { show: true }, // Display X-axis value in tooltip
        y: { formatter: (value) => `${value} Employees` }, // Customize tooltip value
      },
      plotOptions: {
        bar: {
          horizontal: false, // Make the bars vertical
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  // Handle chart type change
  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      {/* Dropdown to select chart type */}
      <select
        className="form-control mb-4"
        value={chartType}
        onChange={handleChartTypeChange}
      >
        <option value="pie">Pie Chart</option>
        {/* <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option> */}
      </select>

      {/* ApexCharts Component */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type={chartType}
        width="500"
      />
    </div>
  );
};

export default EmployeeChart;
