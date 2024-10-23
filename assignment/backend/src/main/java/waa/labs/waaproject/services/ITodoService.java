package waa.labs.waaproject.services;
import waa.labs.waaproject.models.Todo;

import java.util.List;

public interface ITodoService {
    List<Todo> getAllToDos();
    Todo getToDoById(Long id);
    Todo saveOrUpdate(Todo toDo);
    void deleteToDoById(Long id);
}
