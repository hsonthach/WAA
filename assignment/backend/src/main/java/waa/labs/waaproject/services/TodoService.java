package waa.labs.waaproject.services;

import org.springframework.stereotype.Service;
import waa.labs.waaproject.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import waa.labs.waaproject.repositories.ITodoRepository;

import java.util.ArrayList;
import java.util.List;

@Service  // Make sure this annotation is present, to be autowire
public class TodoService implements ITodoService {

    @Autowired
    private ITodoRepository toDoRepository;

    @Override
    public List<Todo> getAllToDos() {
        List<Todo> todos = new ArrayList<>();
        toDoRepository.findAll().forEach(todos::add);
        return todos;
    }

    @Override
    public Todo getToDoById(Long id) {
        return toDoRepository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
    }

    @Override
    public Todo saveOrUpdate(Todo toDo) {
        return toDoRepository.save(toDo);
    }

    @Override
    public void deleteToDoById(Long id) {
        toDoRepository.deleteById(id);
    }
}
