package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
class Reservation {
    @Id
    private int id;
    private String name;
}
