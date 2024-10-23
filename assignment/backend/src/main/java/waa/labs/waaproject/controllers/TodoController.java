package waa.labs.waaproject.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.labs.waaproject.models.Todo;
import waa.labs.waaproject.services.ITodoService;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final ITodoService todoService;

    // @Autowired
    public TodoController(ITodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        System.out.println("Hello Todos");
        return List.of();
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