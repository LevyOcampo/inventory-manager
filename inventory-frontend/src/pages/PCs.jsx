import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PCs() {
  const [pcs, setPCs] = useState([]); // PC list
  const [filteredPCs, setFilteredPCs] = useState([]); // Filtered list for search
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newPC, setNewPC] = useState({
    serial_number: "",
    model_number: "",
    processor: "",
    memory: "",
    hard_drive: "",
    status: "available",
  });
  const navigate = useNavigate();

  // Fetch PCs when component mounts
  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/pcs");
        setPCs(data);
        setFilteredPCs(data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching PCs:", error);
      }
    };
    fetchPCs();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPC((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search query input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter PCs based on the search query
    const filtered = pcs.filter((pc) =>
      pc.serial_number.toLowerCase().includes(query) ||
      pc.model_number.toLowerCase().includes(query) ||
      pc.processor.toLowerCase().includes(query) ||
      pc.memory.toLowerCase().includes(query) ||
      pc.hard_drive.toLowerCase().includes(query) ||
      pc.status.toLowerCase().includes(query)
    );

    setFilteredPCs(filtered);
  };

  // Add a new PC
  const handleAddPC = async () => {
    try {
      await axios.post("http://localhost:3000/pcs", newPC);
  
      // Re-fetch updated PC list
      const { data } = await axios.get("http://localhost:3000/pcs");
      setPCs(data);
      setFilteredPCs(data);
  
      setModalOpen(false); // Close modal
      setNewPC({
        serial_number: "",
        model_number: "",
        processor: "",
        memory: "",
        hard_drive: "",
        status: "available",
      });
    } catch (error) {
      console.error("Error adding PC:", error);
    }
  };
  

  // Handle row click to navigate to details pages
  const handleRowClick = (id) => {
    navigate(`/pcs/${id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>PCs</h1>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          Add New Item
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search PCs..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />

      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Serial Number</th>
            <th>Model Name</th>
            <th>Processor</th>
            <th>Memory</th>
            <th>Hard Drive</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPCs.map((pc) => (
            <tr
              key={pc.id}
              onClick={() => handleRowClick(pc.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{pc.serial_number}</td>
              <td>{pc.model_number}</td>
              <td>{pc.processor}</td>
              <td>{pc.memory}</td>
              <td>{pc.hard_drive}</td>
              <td>{pc.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new PC */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New PC"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Serial Number:</label>
            <input
              type="text"
              name="serial_number"
              value={newPC.serial_number}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Model Number:</label>
            <input
              type="text"
              name="model_number"
              value={newPC.model_number}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Processor:</label>
            <input
              type="text"
              name="processor"
              value={newPC.processor}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Memory:</label>
            <input
              type="text"
              name="memory"
              value={newPC.memory}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Hard Drive:</label>
            <input
              type="text"
              name="hard_drive"
              value={newPC.hard_drive}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={newPC.status}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddPC}
            className="btn btn-success mt-2"
          >
            Add PC
          </button>
        </form>
      </Modal>
    </div>
  );
}
