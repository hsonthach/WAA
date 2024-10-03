package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
class Major {

    @Id
    int id;
    private String name;
    private String description;

    @OneToOne
    private Student student;
}
