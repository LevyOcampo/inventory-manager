import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    pcs: 0,
    monitors: 0,
    unassigned: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employees = await axios.get("http://localhost:3000/employees");
        const pcs = await axios.get("http://localhost:3000/pcs");
        const monitors = await axios.get("http://localhost:3000/monitors");
        const unassigned = pcs.data.filter((pc) => !pc.assigned_to).length;

        setStats({
          employees: employees.data.length,
          pcs: pcs.data.length,
          monitors: monitors.data.length,
          unassigned,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Employees</h5>
              <p className="card-text">{stats.employees}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">PCs</h5>
              <p className="card-text">{stats.pcs}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Monitors</h5>
              <p className="card-text">{stats.monitors}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Unassigned Equipment</h5>
              <p className="card-text">{stats.unassigned}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
