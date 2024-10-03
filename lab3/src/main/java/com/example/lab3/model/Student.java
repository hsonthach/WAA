package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

import java.util.List;

@Entity
class Student {
    @Id
    private int id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private int year;
    private int credits;
    private double gpa;

    @ManyToMany
    private List<Course> courses;

    @OneToOne(mappedBy = "student")
    private Major major;
}
