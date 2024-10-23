package waa.labs.waaproject.services;

import waa.labs.waaproject.models.Todo;

import java.util.List;

public interface ITodoService {
    Todo updateTodoById(Todo todo, long id);
}
