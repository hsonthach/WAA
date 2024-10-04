package com.example.lab1.controller;

import com.example.lab1.domain.Book;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BooksController {
    // store books in memory
    private List<Book> books = new ArrayList<>(
            List.of(
                    Book.builder().id("1").title("The Great Gatsby").isbn("978-3-16-148410-0").build(),
                    Book.builder().id("2").title("It ends with us").isbn("978-3-16-148410-1").build()
            )
    );

    @GetMapping(value = "/books",produces = "application/v1+json")
    public ResponseEntity<List<Book>> getBooks() {
        if (books.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(books);

    }

    @GetMapping(value = "/books/{id}", headers="X-API-VERSION=1")
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        Book book = books.stream()
                .filter(b -> b.getId().equals(id))
                .findFirst()
                .orElse(null);
        if (book == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(book);
    }

    @PostMapping("/v1/books")
    public Book addBook(@RequestBody Book book) {
        books.add(book);
        return book;
    }

    @PutMapping(value = "/books/{id}",params = "version=1")
    public ResponseEntity<Book> updateBook(@RequestBody Book book, @PathVariable String id) {
       Book bookToUpdate = books.stream()
               .filter(b -> b.getId().equals(id))
               .findFirst()
               .orElse(null);
         if (bookToUpdate == null) {
                return ResponseEntity.noContent().build();
            }
            else {
                bookToUpdate.setTitle(book.getTitle());
                bookToUpdate.setIsbn(book.getIsbn());
                return ResponseEntity.ok(bookToUpdate);
         }
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable String id) {
        Book bookToDelete = books.stream()
                .filter(b -> b.getId().equals(id))
                .findFirst()
                .orElse(null);
        if (bookToDelete == null) {
            return ResponseEntity.notFound().build();
        }
        books.remove(bookToDelete);
        return ResponseEntity.noContent().build();
    }
}
