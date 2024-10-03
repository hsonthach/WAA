package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.List;

@Entity
class Course {
    @Id
    private int id;
    private String name;
    private String description;
    private int credits;

    @ManyToMany(mappedBy = "courses")
    private List<Student> students;

}
