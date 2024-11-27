import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Employees() {
  const [employees, setEmployees] = useState([]); // Employee list
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    division: "",
    section: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/employees");
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new employee
  const handleAddEmployee = async () => {
    try {
      const response = await axios.post("http://localhost:3000/employees", newEmployee);
      setEmployees((prev) => [...prev, response.data]);
      setModalOpen(false); // Close the modal
      setNewEmployee({ name: "", position: "", division: "", section: "" }); // Reset form
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Handle row click to navigate to details page
  const handleRowClick = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <div>
      <h1>Employees</h1>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">Add New Item</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Division</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} onClick={() => handleRowClick(employee.id)} style={{ cursor: "pointer" }}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.division}</td>
              <td>{employee.section}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new employee */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add New Employee">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
          </label>
          <label>
            Position:
            <input type="text" name="position" value={newEmployee.position} onChange={handleInputChange} />
          </label>
          <label>
            Division:
            <input type="text" name="division" value={newEmployee.division} onChange={handleInputChange} />
          </label>
          <label>
            Section:
            <input type="text" name="section" value={newEmployee.section} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleAddEmployee} className="btn btn-success">Add Employee</button>
        </form>
      </Modal>
    </div>
  );
}
