package com.example.lab3.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Book {
    @Id
    private int id;
    private String title;
    private String isbn;

    @ManyToOne
    private Publisher publisher;

    @OneToOne
    private Author author;
}
