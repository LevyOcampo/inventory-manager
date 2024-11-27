import { useEffect, useState } from "react";
import axios from "axios";

const PCs = () => {
  const [pcs, setPCs] = useState([]);

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

  return (
    <div>
      <h1>PCs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Number</th>
            <th>Model</th>
            <th>Processor</th>
            <th>Memory</th>
            <th>Hard Drive</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pcs.map((pc) => (
            <tr key={pc.id}>
              <td>{pc.id}</td>
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
    </div>
  );
};

export default PCs;
