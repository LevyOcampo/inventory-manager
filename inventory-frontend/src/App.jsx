import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import PCs from "./pages/PCs";
import Monitors from "./pages/Monitors";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/pcs" element={<PCs />} />
          <Route path="/monitors" element={<Monitors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
