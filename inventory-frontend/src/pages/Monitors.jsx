import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Monitors() {
  const [monitors, setMonitors] = useState([]); // Monitor list
  const [filteredMonitors, setFilteredMonitors] = useState([]); // Filtered list for search
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newMonitor, setNewMonitor] = useState({
    serial_number: "",
    model_number: "",
    size: "",
    status: "available",
  });
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch monitors when component mounts
  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/monitors");
        setMonitors(data);
        setFilteredMonitors(data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching monitors:", error);
      }
    };
    fetchMonitors();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMonitor((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search query input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter monitors based on the search query
    const filtered = monitors.filter((monitor) =>
      monitor.serial_number.toLowerCase().includes(query) ||
      monitor.model_number.toLowerCase().includes(query) ||
      monitor.size.toLowerCase().includes(query) ||
      monitor.status.toLowerCase().includes(query)
    );

    setFilteredMonitors(filtered);
  };

  // Add a new monitor
  const handleAddMonitor = async () => {
    try {
      await axios.post("http://localhost:3000/monitors", newMonitor);
  
      // Re-fetch updated monitor list
      const { data } = await axios.get("http://localhost:3000/monitors");
      setMonitors(data);
      setFilteredMonitors(data);
  
      setModalOpen(false); // Close modal
      setNewMonitor({
        serial_number: "",
        model_number: "",
        size: "",
        status: "available",
      });
    } catch (error) {
      console.error("Error adding monitor:", error);
    }
  };
  

  // Handle row click to navigate to details page
  const handleRowClick = (id) => {
    navigate(`/monitors/${id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Monitors</h1>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          Add New Item
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search monitors..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />

      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Serial Number</th>
            <th>Model Name</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredMonitors.map((monitor) => (
            <tr
              key={monitor.id}
              onClick={() => handleRowClick(monitor.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{monitor.serial_number}</td>
              <td>{monitor.model_number}</td>
              <td>{monitor.size}</td>
              <td>{monitor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new monitor */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Monitor"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Serial Number:</label>
            <input
              type="text"
              name="serial_number"
              value={newMonitor.serial_number}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Model Number:</label>
            <input
              type="text"
              name="model_number"
              value={newMonitor.model_number}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Size:</label>
            <input
              type="text"
              name="size"
              value={newMonitor.size}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={newMonitor.status}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddMonitor}
            className="btn btn-success mt-2"
          >
            Add Monitor
          </button>
        </form>
      </Modal>
    </div>
  );
}
