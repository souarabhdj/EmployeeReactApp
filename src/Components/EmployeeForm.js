import React from "react";

const EmployeeForm = ({
  employeeData,
  states,
  isEditMode,
  handleChange,
  handleSubmit,
  resetForm,
}) => {
  return (
    <form id="employeeForm" onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Designation</label>
        <input
          type="text"
          name="designation"
          value={employeeData.designation}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Salary</label>
        <input
          type="number"
          name="salary"
          value={employeeData.salary}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Date of Joining</label>
        <input
          type="date"
          name="dateOfJoining"
          value={employeeData.dateOfJoining}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">State</label>
        <select
          name="state"
          value={employeeData.state}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select a State</option>
          {states.map((state) => (
            <option key={state.stateId} value={state.stateId}>
              {state.stateName}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label d-block">Gender</label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={employeeData.gender === "Male"}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={employeeData.gender === "Female"}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Female</label>
        </div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={employeeData.dob}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Age</label>
        <input
          type="text"
          value={employeeData.age}
          className="form-control"
          readOnly
        />
      </div>
      <div className="col-12 d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? "Update" : "Save"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetForm}>
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
