import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "jquery-validation";

import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import EmployeeChart from "./EmployeeChart";
import PDFDownloader from "./PDFDownloader";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    designation: "",
    salary: "",
    dateOfJoining: "",
    state: "",
    gender: "",
    dob: "",
    age: "",
  });

  const [states, setStates] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chartType, setChartType] = useState("pie");
  const [isChartVisible, setIsChartVisible] = useState(false);

  const recordsPerPage = 5;

  useEffect(() => {
    fetchStates();
    fetchEmployeeList();
    initializeValidation();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [searchText]);

  const fetchStates = async () => {
    try {
      const response = await axios.get("https://localhost:7260/api/Employee/statedropdown");
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchEmployeeList = async () => {
    try {
      const response = await axios.get("https://localhost:7260/api/Employee/EmployeeList");
      setEmployeeList(response.data);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  const initializeValidation = () => {
    setTimeout(() => {
      $.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
      }, "Only letters are allowed");

      $("#employeeForm").validate({
        rules: {
          name: {
            required: true,
            lettersonly: true,
          },
          designation: {
            required: true,
            lettersonly: true,
          },
          salary: {
            required: true,
            number: true,
          },
          dateOfJoining: "required",
          state: "required",
          gender: "required",
          dob: "required",
        },
        messages: {
          name: {
            required: "Please enter name",
            lettersonly: "Only letters allowed",
          },
          designation: {
            required: "Please enter designation",
            lettersonly: "Only letters allowed",
          },
          salary: {
            required: "Please enter salary",
            number: "Enter valid number",
          },
          gender: "Please select gender",
        },
        errorClass: "text-danger",
      });
    }, 100);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const age = calculateAge(value);
      setEmployeeData((prev) => ({ ...prev, dob: value, age }));
    } else {
      setEmployeeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setEmployeeData({
      name: "",
      designation: "",
      salary: "",
      dateOfJoining: "",
      state: "",
      gender: "",
      dob: "",
      age: "",
    });
    setIsEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!$("#employeeForm").valid()) return;

    const payload = {
      empId: employeeData.id,
      name: employeeData.name,
      designation: employeeData.designation,
      salary: parseFloat(employeeData.salary),
      dateOfJoining: employeeData.dateOfJoining,
      gender: employeeData.gender,
      dob: employeeData.dob,
      age: employeeData.age,
      stateId: parseInt(employeeData.state),
    };

    try {
      if (isEditMode) {
        await axios.put(
          `https://localhost:7260/api/Employee/UpdateEmployee/${employeeData.id}`,
          payload
        );
        alert("Employee updated successfully!");
      } else {
        await axios.post("https://localhost:7260/api/Employee/CreateEmployee", payload);
        alert("Employee saved successfully!");
      }
      fetchEmployeeList();
      resetForm();
    } catch (error) {
      console.error("Error saving/updating employee:", error);
      alert("Operation failed.");
    }
  };

  const handleEdit = (empId) => {
    const emp = employeeList.find((e) => e.empId === empId);
    setEmployeeData({
      id: emp.empId,
      name: emp.empName,
      designation: emp.designation,
      salary: emp.salary,
      dateOfJoining: emp.dateOfJoin,
      state: emp.stateId,
      gender: emp.gender,
      dob: emp.dob,
      age: emp.age,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`https://localhost:7260/api/Employee/${empId}`);
      alert("Employee deleted successfully!");
      fetchEmployeeList();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  const filteredEmployees = employeeList.filter(emp =>
    emp.empName.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  const handlePrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleChartToggle = () => setIsChartVisible(prev => !prev);
  const handleChartTypeChange = (e) => setChartType(e.target.value);

  return (
    <div className="container mt-4">
      <EmployeeForm
        employeeData={employeeData}
        states={states}
        isEditMode={isEditMode}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />

      <div className="d-flex gap-2 my-3">
       
        <button className="btn btn-info" onClick={handleChartToggle}>
          {isChartVisible ? "Hide Chart" : "Show Chart"}
        </button>
        {isChartVisible && (
          <div className="d-flex gap-2 align-items-center">
            <label>Select Chart Type:</label>
            <select
              className="form-select"
              value={chartType}
              onChange={handleChartTypeChange}
            >
              <option value="pie">Pie</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
            </select>
          </div>
        )}
      </div>

      {isChartVisible && (
        <EmployeeChart employeeList={employeeList} chartType={chartType} />
      )}

<EmployeeList
  employeeList={employeeList}
  currentEmployees={currentEmployees}
  searchText={searchText}
  setSearchText={setSearchText}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  handlePrevious={handlePrevious}
  handleNext={handleNext}
  currentPage={currentPage}
  totalPages={totalPages}
/>
    </div>
  );
};

export default Employee;
