package waa.labs.waaproject.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import waa.labs.waaproject.models.PageHolder;
import waa.labs.waaproject.models.Pagination;
import waa.labs.waaproject.models.Todo;
import waa.labs.waaproject.services.ITodoService;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {

    private final ITodoService todoService;

    @GetMapping
    public PageHolder<Todo> getAllTodos(@ModelAttribute Pagination pagination) {
        return todoService.getTodos(pagination);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo, @PathVariable long id) {
        Todo updatedTodo = todoService.updateTodoById(todo, id);

        if (updatedTodo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedTodo);
    }
}
