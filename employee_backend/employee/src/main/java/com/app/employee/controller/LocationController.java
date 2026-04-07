package com.app.employee.controller;

import com.app.employee.model.Location;
import com.app.employee.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
//This is to connect with the React frontend running on localhost:3000
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    private final LocationService service;

    public LocationController(LocationService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping("/create")
    public Location createLocation(@RequestBody Location location) {
        return service.save(location);
    }

    // READ ALL
    @GetMapping("/all")
    public List<Location> getAllLocations() {
        return service.getAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable int id) {
        return service.getById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Location updateLocation(@PathVariable int id, @RequestBody Location location) {
        location.setLocationId(id);
        return service.save(location);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteLocation(@PathVariable int id) {
        service.delete(id);
        return "Location deleted successfully";
    }
}