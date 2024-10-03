package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Employee {
    @Id
    private int id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String position;
    private int salary;

    @ManyToOne
    private Department department;
}
