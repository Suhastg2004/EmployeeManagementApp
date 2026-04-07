package com.app.employee.controller;

import com.app.employee.model.Employee;
import com.app.employee.model.Department;
import com.app.employee.service.EmployeeService;
import com.app.employee.service.DepartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService empService;
    private final DepartmentService deptService;

    public EmployeeController(EmployeeService empService, DepartmentService deptService) {
        this.empService = empService;
        this.deptService = deptService;
    }

    // CREATE
    @PostMapping("/create")
    public Employee createEmployee(@RequestBody Employee emp,
                                   @RequestParam int deptId) {
        Department dept = deptService.getById(deptId);
        emp.setDepartment(dept);
        return empService.save(emp);
    }

    // READ ALL
    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return empService.getAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return empService.getById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Employee updateEmployee(@PathVariable int id,
                                  @RequestBody Employee emp,
                                  @RequestParam int deptId) {
        emp.setEmpId(id);
        emp.setDepartment(deptService.getById(deptId));
        return empService.save(emp);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable int id) {
        empService.delete(id);
        return "Employee deleted successfully";
    }

    // CUSTOM QUERY - BY STATUS
    @GetMapping("/status/{status}")
    public List<Employee> getByStatus(@PathVariable String status) {
        return empService.getByStatus(status);
    }

    // CUSTOM QUERY - HIGH SALARY
    @GetMapping("/salary/{salary}")
    public List<Employee> getBySalary(@PathVariable double salary) {
        return empService.getHighSalary(salary);
    }
}