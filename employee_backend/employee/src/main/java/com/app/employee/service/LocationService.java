package com.app.employee.service;

import com.app.employee.model.Location;
import com.app.employee.repository.LocationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LocationService {

    private final LocationRepository repo;

    public LocationService(LocationRepository repo) {
        this.repo = repo;
    }

    public Location save(Location l) { return repo.save(l); }

    public List<Location> getAll() { return repo.findAll(); }

    public Location getById(int id) { return repo.findById(id).orElse(null); }

    public void delete(int id) { repo.deleteById(id); }
}