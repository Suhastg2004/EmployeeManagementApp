import { useEffect, useState } from "react";
import "../styles/Location.css";

function Location() {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: ""
  });

  useEffect(() => {
    fetchLocations();
  }, []);

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

  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/locations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ city: "", state: "", country: "" });
        fetchLocations();
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/locations/delete/${id}`, {
        method: "DELETE"
      });
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="location-container">
      <h2>Locations</h2>
      
      <form onSubmit={handleAddLocation} className="form">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Location</button>
      </form>

      <div className="list">
        {locations.map((location) => (
          <div key={location.locationId} className="item">
            <div>
              <strong>{location.city}</strong>, {location.state}, {location.country}
            </div>
            <button onClick={() => handleDeleteLocation(location.locationId)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Location;
