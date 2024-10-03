package com.example.lab3.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.SecondaryTable;

@Embeddable
class Payment {

    private String paydate;
    private double amount;
}
