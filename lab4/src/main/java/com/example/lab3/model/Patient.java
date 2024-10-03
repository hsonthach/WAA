package com.example.lab3.model;

import jakarta.persistence.*;

@Entity
@SecondaryTable(name = "address", pkJoinColumns = @PrimaryKeyJoinColumn(name = "PATIENT_ID"))
class Patient {
    @Id
    private Long id;

    @Column(name="NAME")
    private String name;
    @Column(table="address",name = "STREET")
    private String street;
    @Column(table="address",name = "ZIP")
    private String zip;
    @Column(table="address",name = "CITY")
    private String city;
}
