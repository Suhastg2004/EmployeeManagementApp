import { useEffect, useState } from "react";
import "../styles/Employee.css";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    empName: "",
    email: "",
    phone: "",
    salary: "",
    hireDate: "",
    status: "ACTIVE",
    deptId: ""
  });

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees/all");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/departments/all");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/create?deptId=${formData.deptId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            empName: formData.empName,
            email: formData.email,
            phone: formData.phone,
            salary: parseFloat(formData.salary),
            hireDate: formData.hireDate,
            status: formData.status
          })
        }
      );
      if (response.ok) {
        setFormData({
          empName: "",
          email: "",
          phone: "",
          salary: "",
          hireDate: "",
          status: "ACTIVE",
          deptId: ""
        });
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/employees/delete/${id}`, {
        method: "DELETE"
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => d.deptId === deptId);
    return dept ? dept.deptName : "Unknown";
  };

  return (
    <div className="employee-container">
      <h2>Employees</h2>

      <form onSubmit={handleAddEmployee} className="form">
        <input
          type="text"
          name="empName"
          placeholder="Employee Name"
          value={formData.empName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="ON_LEAVE">On Leave</option>
        </select>
        <select
          name="deptId"
          value={formData.deptId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.deptId} value={dept.deptId}>
              {dept.deptName}
            </option>
          ))}
        </select>
        <button type="submit">Add Employee</button>
      </form>

      <div className="list">
        {employees.map((emp) => (
          <div key={emp.empId} className="item">
            <div>
              <strong>{emp.empName}</strong> - {emp.email}
              <br />
              <small>
                Phone: {emp.phone} | Salary: ${emp.salary.toLocaleString()} |
                Department: {getDepartmentName(emp.department?.deptId)}
              </small>
              <br />
              <small>Hired: {emp.hireDate} | Status: {emp.status}</small>
            </div>
            <button onClick={() => handleDeleteEmployee(emp.empId)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employee;
