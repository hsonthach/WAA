package com.example.lab3.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "`order`")
class Order {
    @Id
    @Column(name = "orderid")
    int id;
    private LocalDate date;

    @ManyToOne
    private Customer customer;

    @OneToMany
    @JoinColumn(name = "order_orderid")
    private List<OrderLine> orderLines;
}
