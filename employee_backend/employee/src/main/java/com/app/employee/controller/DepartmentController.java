package com.app.employee.controller;

import com.app.employee.model.Department;
import com.app.employee.model.Location;
import com.app.employee.service.DepartmentService;
import com.app.employee.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    private final DepartmentService deptService;
    private final LocationService locationService;

    public DepartmentController(DepartmentService deptService, LocationService locationService) {
        this.deptService = deptService;
        this.locationService = locationService;
    }

    // CREATE
    @PostMapping("/create")
    public Department createDepartment(@RequestBody Department dept, @RequestParam int locationId) {
        Location location = locationService.getById(locationId);
        dept.setLocation(location);
        return deptService.save(dept);
    }

    // READ ALL
    @GetMapping("/all")
    public List<Department> getAllDepartments() {
        return deptService.getAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable int id) {
        return deptService.getById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Department updateDepartment(@PathVariable int id,
                                       @RequestBody Department dept,
                                       @RequestParam int locationId) {
        dept.setDeptId(id);
        dept.setLocation(locationService.getById(locationId));
        return deptService.save(dept);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteDepartment(@PathVariable int id) {
        deptService.delete(id);
        return "Department deleted successfully";
    }
}