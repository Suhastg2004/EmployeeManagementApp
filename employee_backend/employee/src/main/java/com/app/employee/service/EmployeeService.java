package com.app.employee.service;

import com.app.employee.model.Employee;
import com.app.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public Employee save(Employee e) { return repo.save(e); }

    public List<Employee> getAll() { return repo.findAll(); }

    public Employee getById(int id) { return repo.findById(id).orElse(null); }

    public void delete(int id) { repo.deleteById(id); }

    public List<Employee> getByStatus(String status) {
        return repo.findByStatus(status);
    }

    public List<Employee> getHighSalary(double salary) {
        return repo.findBySalaryGreaterThan(salary);
    }
}