package com.example.lab1.domain;

import lombok.*;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Builder
public class Book {
    @Getter
//    @NonNull
    private String id;
    @Getter
    private String title;
    @Getter
    private String isbn;
}
