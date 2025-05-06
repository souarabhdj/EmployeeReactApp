import React, { useState } from "react";
import Chart from "react-apexcharts";

const EmployeeChart = ({ employeeList }) => {
  const [chartType, setChartType] = useState("pie"); 


  if (!employeeList || employeeList.length === 0) {
    return <p>No employee data available.</p>;
  }

 
  const designationCounts = employeeList.reduce((acc, emp) => {
    if (emp && emp.designation) {
      acc[emp.designation] = (acc[emp.designation] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(designationCounts);
  const data = Object.values(designationCounts);

  
  const series = [
    {
      name: "Employee Designations", 
      data: data,
    },
  ];

 
  const getYAxisConfig = () => {
    if (chartType === "line") {
      return {
        title: { text: "Number of Employees" },
        min: 0,
      };
    }
    return {}; 
  };

  const chartData = {
    series,
    options: {
      chart: {
        type: chartType, 
      },
      title: {
        text: "Designation Wise Distribution",
        align: "center",
      },
      labels, // For Pie Chart
      xaxis: chartType === "bar" ? { categories: labels } : undefined,
        yaxis: getYAxisConfig(), 
      tooltip: {
        enabled: true, 
        theme: "light",
        x: { show: true }, 
        y: { formatter: (value) => `${value} Employees` }, 
      },
      plotOptions: {
        bar: {
          horizontal: false, 
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };


  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div className="mt-4 d-flex flex-column align-items-center">
     
      <select
        className="form-control mb-4"
        value={chartType}
        onChange={handleChartTypeChange}
      >
        <option value="pie">Pie Chart</option>
      
      </select>

      
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
