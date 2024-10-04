package com.example.lab1.controller;

import com.example.lab1.domain.Book;
import com.example.lab1.repository.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BooksController {
    // store books in memory
    @Autowired
    IBookRepository bookRepository;
    @GetMapping(value = "/books",produces = "application/v1+json")
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> books = bookRepository.findAll();
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }
//
    @GetMapping(value = "/books/{id}", headers="X-API-VERSION=1")
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        Book book = bookRepository.findById(Long.parseLong(id)).orElse(null);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }
//
    @PostMapping("/v1/books")
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }
//
    @PutMapping(value = "/books/{id}",params = "version=1")
    public ResponseEntity<Book> updateBook(@RequestBody Book book, @PathVariable String id) {
        Book bookToUpdate = bookRepository.findById(Long.parseLong(id)).orElse(null);
        if (bookToUpdate == null) {
            return ResponseEntity.notFound().build();
        }
        bookToUpdate.setTitle(book.getTitle());
        bookToUpdate.setIsbn(book.getIsbn());
        bookRepository.save(bookToUpdate);
        return ResponseEntity.ok(bookToUpdate);
    }
//
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable String id) {
        Book book = bookRepository.findById(Long.parseLong(id)).orElse(null);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        bookRepository.delete(book);
        return ResponseEntity.ok(book);
    }
}
