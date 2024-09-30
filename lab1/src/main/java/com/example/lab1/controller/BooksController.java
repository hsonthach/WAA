package com.example.lab1.controller;

import com.example.lab1.domain.Book;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BooksController {
    // store books in memory
    private List<Book> books = new ArrayList<>(
            List.of(
                    Book.builder().id(1).title("The Great Gatsby").isbn("978-3-16-148410-0").build(),
                    Book.builder().id(2).title("It ends with us").isbn("978-3-16-148410-1").build()
            )
    );
    @GetMapping("/books")
    public List<Book> getBooks() {
        return books;
    }

    @PostMapping("/books")
    public Book addBook(@RequestBody Book book) {
        books.add(book);
        return book;
    }
}
