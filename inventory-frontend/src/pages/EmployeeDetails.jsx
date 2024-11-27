import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EmployeeDetails() {
  const { id } = useParams(); // Get employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [pc, setPC] = useState(null);
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/employees/${id}`);
        setEmployee(data.employee);
        setPC(data.pc); // Related PC
        setMonitor(data.monitor); // Related Monitor
      } catch (err) {
        setError("Failed to load employee details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <div>Loading employee details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Division:</strong> {employee.division}</p>
      <p><strong>Section:</strong> {employee.section}</p>

      {pc ? (
        <>
          <h2>Assigned PC</h2>
          <p><strong>Serial Number:</strong> {pc.serial_number}</p>
          <p><strong>Model:</strong> {pc.model_number}</p>
          <p><strong>Processor:</strong> {pc.processor}</p>
          <p><strong>Memory:</strong> {pc.memory}</p>
          <p><strong>Hard Drive:</strong> {pc.hard_drive}</p>
          <p><strong>Status:</strong> {pc.status}</p>
        </>
      ) : (
        <p>No PC assigned.</p>
      )}

      {monitor ? (
        <>
          <h2>Assigned Monitor</h2>
          <p><strong>Serial Number:</strong> {monitor.serial_number}</p>
          <p><strong>Model:</strong> {monitor.model_number}</p>
          <p><strong>Size:</strong> {monitor.size}</p>
          <p><strong>Status:</strong> {monitor.status}</p>
        </>
      ) : (
        <p>No Monitor assigned.</p>
      )}
    </div>
  );
}
