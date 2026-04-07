import { useEffect, useState } from "react";
import "../styles/Department.css";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    deptName: "",
    budget: "",
    locationId: ""
  });

  useEffect(() => {
    fetchDepartments();
    fetchLocations();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/departments/all");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/locations/all");
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/departments/create?locationId=${formData.locationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            deptName: formData.deptName,
            budget: parseFloat(formData.budget)
          })
        }
      );
      if (response.ok) {
        setFormData({ deptName: "", budget: "", locationId: "" });
        fetchDepartments();
      }
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/departments/delete/${id}`, {
        method: "DELETE"
      });
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const getLocationName = (locationId) => {
    const location = locations.find(loc => loc.locationId === locationId);
    return location ? `${location.city}, ${location.country}` : "Unknown";
  };

  return (
    <div className="department-container">
      <h2>Departments</h2>

      <form onSubmit={handleAddDepartment} className="form">
        <input
          type="text"
          name="deptName"
          placeholder="Department Name"
          value={formData.deptName}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleInputChange}
          required
        />
        <select
          name="locationId"
          value={formData.locationId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.locationId} value={location.locationId}>
              {location.city}, {location.country}
            </option>
          ))}
        </select>
        <button type="submit">Add Department</button>
      </form>

      <div className="list">
        {departments.map((dept) => (
          <div key={dept.deptId} className="item">
            <div>
              <strong>{dept.deptName}</strong> - Budget: ${dept.budget.toLocaleString()}
              <br />
              <small>Location: {getLocationName(dept.location?.locationId)}</small>
            </div>
            <button onClick={() => handleDeleteDepartment(dept.deptId)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Department;
