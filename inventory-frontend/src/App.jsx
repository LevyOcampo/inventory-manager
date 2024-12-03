import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Employees from "./pages/employees";
import PCs from "./pages/PCs";
import Monitors from "./pages/Monitors";
import Dashboard from "./pages/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";
import PCDetails from "./pages/PCDetails";
import MonitorDetails from "./pages/MonitorDetails";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "250px", flex: 1, padding: "20px" }}>
          <Routes>
            {/* Redirect root to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* Other Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/pcs" element={<PCs />} />
            <Route path="/monitors" element={<Monitors />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/pcs/:id" element={<PCDetails />} />
            <Route path="/monitors/:id" element={<MonitorDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
