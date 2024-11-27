import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Monitors() {
  const [monitors, setMonitors] = useState([]); // Monitor list
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

  // Add a new monitor
  const handleAddMonitor = async () => {
    try {
      const response = await axios.post("http://localhost:3000/monitors", newMonitor);
      setMonitors((prev) => [...prev, response.data]);
      setModalOpen(false); // Close the modal
      setNewMonitor({ serial_number: "", model_number: "", size: "", status: "available" }); // Reset form
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
      <h1>Monitors</h1>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">Add New Item</button>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Model Number</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor) => (
            <tr key={monitor.id} onClick={() => handleRowClick(monitor.id)} style={{ cursor: "pointer" }}>
              <td>{monitor.serial_number}</td>
              <td>{monitor.model_number}</td>
              <td>{monitor.size}</td>
              <td>{monitor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new monitor */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add New Monitor">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Serial Number:
            <input type="text" name="serial_number" value={newMonitor.serial_number} onChange={handleInputChange} />
          </label>
          <label>
            Model Number:
            <input type="text" name="model_number" value={newMonitor.model_number} onChange={handleInputChange} />
          </label>
          <label>
            Size:
            <input type="text" name="size" value={newMonitor.size} onChange={handleInputChange} />
          </label>
          <label>
            Status:
            <select name="status" value={newMonitor.status} onChange={handleInputChange}>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
            </select>
          </label>
          <button type="button" onClick={handleAddMonitor} className="btn btn-success">Add Monitor</button>
        </form>
      </Modal>
    </div>
  );
}
