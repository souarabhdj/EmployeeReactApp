import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PDFDownloader = ({ employeeList }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee List", 14, 15);

    const tableColumn = ["Name", "Designation", "Salary", "Joining Date", "State", "Gender", "DOB", "Age"];
    const tableRows = [];

    employeeList.forEach(emp => {
      const empData = [
        emp.empName,
        emp.designation,
        emp.salary,
        emp.dateOfJoin,
        emp.stateName,
        emp.gender,
        emp.dob,
        emp.age,
      ];
      tableRows.push(empData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("employee_list.pdf");
  };

  return (
    <button className="btn btn-primary" onClick={handleDownloadPDF}>
      Download PDF
    </button>
  );
};

export default PDFDownloader;
