import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PCDetails() {
  const { id } = useParams(); // Get PC ID from the URL
  const [pc, setPC] = useState(null);
  const [employee, setEmployee] = useState(null); // Employee assigned to the PC
  const [monitor, setMonitor] = useState(null); // Monitor assigned to the employee
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPCDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/pcs/${id}`);
        setPC(data.pc);
        setEmployee(data.employee);
        setMonitor(data.monitor); // Set the related monitor
      } catch (err) {
        console.error("Error fetching PC details:", err);
        setError("Failed to load PC details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPCDetails();
  }, [id]);

  if (loading) {
    return <div>Loading PC details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>PC Details</h1>
      <p><strong>Serial Number:</strong> {pc.serial_number}</p>
      <p><strong>Model Number:</strong> {pc.model_number}</p>
      <p><strong>Processor:</strong> {pc.processor}</p>
      <p><strong>Memory:</strong> {pc.memory}</p>
      <p><strong>Hard Drive:</strong> {pc.hard_drive}</p>
      <p><strong>Status:</strong> {pc.status}</p>

      {employee ? (
        <>
          <h2>Assigned To</h2>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Division:</strong> {employee.division}</p>
          <p><strong>Section:</strong> {employee.section}</p>
        </>
      ) : (
        <p>No employee assigned to this PC.</p>
      )}

      {monitor ? (
        <>
          <h2>Assigned Monitor</h2>
          <p><strong>Serial Number:</strong> {monitor.serial_number}</p>
          <p><strong>Model Number:</strong> {monitor.model_number}</p>
          <p><strong>Size:</strong> {monitor.size}</p>
          <p><strong>Status:</strong> {monitor.status}</p>
        </>
      ) : (
        <p>No monitor assigned to this employee.</p>
      )}
    </div>
  );
}
