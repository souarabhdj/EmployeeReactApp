import React from "react";
import PDFDownloader from "./PDFDownloader"; // ✅ Make sure the path is correct

const EmployeeList = ({
  employeeList, // ✅ Add this to the props
  currentEmployees,
  searchText,
  setSearchText,
  handleEdit,
  handleDelete,
  handlePrevious,
  handleNext,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="mt-4">
      <div className="mb-3">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name"
          className="form-control"
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>State</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No employees found.
              </td>
            </tr>
          ) : (
            currentEmployees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empName}</td>
                <td>{emp.designation}</td>
                <td>{emp.salary}</td>
                <td>{emp.dateOfJoin}</td>
                <td>{emp.stateName}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.age}</td>
                <td>
                  <button
                    onClick={() => handleEdit(emp.empId)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.empId)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ Pass the full list for PDF download */}
      <PDFDownloader employeeList={employeeList} />

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
