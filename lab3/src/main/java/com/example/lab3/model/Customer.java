package com.example.lab3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
class Customer {
    @Id
    int id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String creditCard;
    private String creditCardType;
    private String creditCardExpiration;
    private String username;
    private String password;
    private String securityQuestion;
    private String securityAnswer;
    private String dateOfBirth;

    @OneToMany
    private List<Reservation> reservations;

}
