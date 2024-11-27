import { useEffect, useState } from "react";
import axios from "axios";

const Monitors = () => {
  const [monitors, setMonitors] = useState([]);

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

  return (
    <div>
      <h1>Monitors</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Number</th>
            <th>Model</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor) => (
            <tr key={monitor.id}>
              <td>{monitor.id}</td>
              <td>{monitor.serial_number}</td>
              <td>{monitor.model_number}</td>
              <td>{monitor.size}</td>
              <td>{monitor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Monitors;
