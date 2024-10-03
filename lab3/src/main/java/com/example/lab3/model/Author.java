package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
class Author {
    @Id
    private int id;

    private String name;
    private String email;
}
