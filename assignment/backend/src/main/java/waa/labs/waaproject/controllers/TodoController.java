package waa.labs.waaproject.controllers;

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
    public List<Todo> getAllToDos() {
        return todoService.getAllToDos();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoService.getToDoById(id);
    }

    @PostMapping
    public Todo createToDo(@RequestBody Todo toDo) {
        return todoService.saveOrUpdate(toDo);
    }

    @PutMapping("/{id}")
    public Todo updateToDo(@PathVariable Long id, @RequestBody Todo toDo) {
        toDo.setId(id);
        return todoService.saveOrUpdate(toDo);
    }

    @DeleteMapping("/{id}")
    public void deleteToDoById(@PathVariable Long id) {
        todoService.deleteToDoById(id);
    }
}
