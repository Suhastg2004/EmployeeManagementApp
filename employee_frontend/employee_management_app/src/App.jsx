import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Location from './components/Location';
import Department from './components/Department';
import Employee from './components/Employee';

function App() {
  const navigate = useNavigate();

  const handleEntityChange = (event) => {
    navigate(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
        <div className="route-controls">
          <nav className="entity-nav">
            <Link to="/locations" className="entity-link">Locations</Link>
            <Link to="/departments" className="entity-link">Departments</Link>
            <Link to="/employees" className="entity-link">Employees</Link>
          </nav>

          <select className="entity-select" defaultValue="/locations" onChange={handleEntityChange}>
            <option value="/locations">Locations</option>
            <option value="/departments">Departments</option>
            <option value="/employees">Employees</option>
          </select>
        </div>
      </header>

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Location />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="*" element={<Location />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
