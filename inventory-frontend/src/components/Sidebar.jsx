import { Link } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Inventory Manager</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/employees">Employees</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pcs">PCs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/monitors">Monitors</Link>
        </li>
      </ul>
    </div>
  );
}
