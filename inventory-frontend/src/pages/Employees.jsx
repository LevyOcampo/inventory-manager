import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]); // Employee list
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered list for search
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    division: "",
    section: "",
  });
  const navigate = useNavigate();

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/employees");
        setEmployees(data);
        setFilteredEmployees(data); // Initialize filtered list
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

  // Handle search query input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter employees based on the search query
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.division.toLowerCase().includes(query) ||
      employee.section.toLowerCase().includes(query)
    );

    setFilteredEmployees(filtered);
  };

  // Add a new employee
  const handleAddEmployee = async () => {
    try {
      await axios.post("http://localhost:3000/employees", newEmployee);
      
      // Re-fetch full employee list
      const { data } = await axios.get("http://localhost:3000/employees");
      setEmployees(data);
      setFilteredEmployees(data);
  
      setModalOpen(false); // Close the modal
      setNewEmployee({
        name: "",
        position: "",
        division: "",
        section: "",
      });
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Employees</h1>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          Add New Item
        </button>
      </div>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={handleSearchChange} 
        className="form-control mb-3"
      />

      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Division</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr
              key={employee.id}
              onClick={() => handleRowClick(employee.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.division}</td>
              <td>{employee.section}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new employee */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Employee"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Division:</label>
            <input
              type="text"
              name="division"
              value={newEmployee.division}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Section:</label>
            <input
              type="text"
              name="section"
              value={newEmployee.section}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button
            type="button"
            onClick={handleAddEmployee}
            className="btn btn-success mt-2"
          >
            Add Employee
          </button>
        </form>
      </Modal>
    </div>
  );
}
