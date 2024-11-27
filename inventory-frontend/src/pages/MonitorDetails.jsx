import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MonitorDetails() {
  const { id } = useParams();
  const [monitor, setMonitor] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [pc, setPC] = useState(null); // Related PC
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/monitors/${id}`);
        setMonitor(data.monitor);
        setEmployee(data.employee);
        setPC(data.pc); // Set the related PC
      } catch (err) {
        console.error("Error fetching Monitor details:", err);
        setError("Failed to load Monitor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonitorDetails();
  }, [id]);

  if (loading) {
    return <div>Loading monitor details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Monitor Details</h1>
      <p><strong>Serial Number:</strong> {monitor.serial_number}</p>
      <p><strong>Model Number:</strong> {monitor.model_number}</p>
      <p><strong>Size:</strong> {monitor.size}</p>
      <p><strong>Status:</strong> {monitor.status}</p>

      {employee ? (
        <>
          <h2>Assigned To</h2>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Division:</strong> {employee.division}</p>
          <p><strong>Section:</strong> {employee.section}</p>
        </>
      ) : (
        <p>No employee assigned to this monitor.</p>
      )}

      {pc ? (
        <>
          <h2>Assigned PC</h2>
          <p><strong>Serial Number:</strong> {pc.serial_number}</p>
          <p><strong>Model Number:</strong> {pc.model_number}</p>
          <p><strong>Processor:</strong> {pc.processor}</p>
          <p><strong>Memory:</strong> {pc.memory}</p>
          <p><strong>Hard Drive:</strong> {pc.hard_drive}</p>
          <p><strong>Status:</strong> {pc.status}</p>
        </>
      ) : (
        <p>No PC assigned to this employee.</p>
      )}
    </div>
  );
}
