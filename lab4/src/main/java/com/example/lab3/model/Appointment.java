package com.example.lab3.model;

import jakarta.persistence.*;

@Entity
class Appointment {
    @Id
    private Long id;
    @Column(name = "APPDATE")
    private String appdate;
    @ManyToOne
    @JoinColumn(name = "PATIENT")
    private Patient patient;
    @Embedded
    @AttributeOverrides(
            {
                    @AttributeOverride(name = "paydate", column = @Column(name = "PAYDATE")),
                    @AttributeOverride(name = "amount", column = @Column(name = "AMOUNT"))
            }
    )
    private Payment payment;
    @ManyToOne
    @JoinColumn(name = "DOCTOR")
    private Doctor doctor;
}