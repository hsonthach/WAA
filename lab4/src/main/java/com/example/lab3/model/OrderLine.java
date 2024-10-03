package com.example.lab3.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
class OrderLine {
    @Id
    private int id;
    private int quantity;

    @ManyToOne
    private Product product;
}
