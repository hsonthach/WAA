package waa.labs.waaproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.labs.waaproject.models.Todo;
import waa.labs.waaproject.repositories.ITodoRepository;

import java.util.List;

@Service  // Make sure this annotation is present, to be autowire
public class TodoService implements ITodoService {
    @Autowired
    private ITodoRepository todoRepository;

    @Override
    public Todo updateTodoById(Todo todo, long id) {
        Todo existingTodo = todoRepository.findById(id).orElse(null);

        if (existingTodo == null) {
            return null;
        }

        existingTodo.setName(todo.getName());
        existingTodo.setDescription(todo.getDescription());

        return todoRepository.save(existingTodo);
    }
}
