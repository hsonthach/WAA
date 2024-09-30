package com.example.lab1.domain;

import lombok.*;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Builder
public class Book {
    @Getter
    private int id;
    @Getter
    private String title;
    @Getter
    private String isbn;
}
