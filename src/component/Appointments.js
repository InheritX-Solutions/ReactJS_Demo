import React from "react";
import EnhancedTable from "./MainTable";
import { Route, useNavigate, Routes } from "react-router-dom";
import DataTableRowGroupDemo from "./GroupbyClinician";
import GroupbyStartDate from "./GroupbyStartDate";
function Appointments() {
  const navigate = useNavigate();
  function handleClick(e) {
    // history.push(e.target.value);
    navigate(e.target.value);
    window.location.reload();
  }
  return (
    <div>
      <h1>Appointment</h1>
      <label>Groupby:</label>
      <select name="cars" id="cars" onChange={handleClick}>
        <option value="/">-</option>
        <option value="/about">StartDate</option>
        <option value="/topics">ClinicianName</option>
        <option value="/">None</option>
      </select>

      <Routes>
        <Route path="/about" element={<GroupbyStartDate />} />
        <Route path="/topics" element={<DataTableRowGroupDemo />} />
        <Route path="/" element={<EnhancedTable />} />
      </Routes>
    </div>
  );
}

export default Appointments;
