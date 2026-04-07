package com.app.employee.service;

import com.app.employee.model.Department;
import com.app.employee.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repo;

    public DepartmentService(DepartmentRepository repo) {
        this.repo = repo;
    }

    public Department save(Department d) { return repo.save(d); }

    public List<Department> getAll() { return repo.findAll(); }

    public Department getById(int id) { return repo.findById(id).orElse(null); }

    public void delete(int id) { repo.deleteById(id); }
}