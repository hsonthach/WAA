package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
class Customer {
    @Id
    int id;
    private String firstname;
    private String lastname;


    @OneToMany(mappedBy = "customer")
    private List<Order> orders;

}
