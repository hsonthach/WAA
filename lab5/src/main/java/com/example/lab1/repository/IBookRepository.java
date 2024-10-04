package com.example.lab1.repository;

import com.example.lab1.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface IBookRepository extends JpaRepository<Book, Long> {


}
