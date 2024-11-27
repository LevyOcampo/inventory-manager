import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function PCs() {
  const [pcs, setPCs] = useState([]); // PC list
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newPC, setNewPC] = useState({
    serial_number: "",
    model_number: "",
    processor: "",
    memory: "",
    hard_drive: "",
    status: "available",
  });
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch PCs when component mounts
  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/pcs");
        setPCs(data);
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

  // Add a new PC
  const handleAddPC = async () => {
    try {
      const response = await axios.post("http://localhost:3000/pcs", newPC);
      setPCs((prev) => [...prev, response.data]);
      setModalOpen(false); // Close the modal
      setNewPC({ serial_number: "", model_number: "", processor: "", memory: "", hard_drive: "", status: "available" }); // Reset form
    } catch (error) {
      console.error("Error adding PC:", error);
    }
  };

  // Handle row click to navigate to details page
  const handleRowClick = (id) => {
    navigate(`/pcs/${id}`);
  };

  return (
    <div>
      <h1>PCs</h1>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">Add New Item</button>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Model Number</th>
            <th>Processor</th>
            <th>Memory</th>
            <th>Hard Drive</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pcs.map((pc) => (
            <tr key={pc.id} onClick={() => handleRowClick(pc.id)} style={{ cursor: "pointer" }}>
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
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add New PC">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Serial Number:
            <input type="text" name="serial_number" value={newPC.serial_number} onChange={handleInputChange} />
          </label>
          <label>
            Model Number:
            <input type="text" name="model_number" value={newPC.model_number} onChange={handleInputChange} />
          </label>
          <label>
            Processor:
            <input type="text" name="processor" value={newPC.processor} onChange={handleInputChange} />
          </label>
          <label>
            Memory:
            <input type="text" name="memory" value={newPC.memory} onChange={handleInputChange} />
          </label>
          <label>
            Hard Drive:
            <input type="text" name="hard_drive" value={newPC.hard_drive} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleAddPC} className="btn btn-success">Add PC</button>
        </form>
      </Modal>
    </div>
  );
}
