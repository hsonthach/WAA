package waa.labs.waaproject.services;

import waa.labs.waaproject.models.Todo;
import waa.labs.waaproject.models.PageHolder;
import waa.labs.waaproject.models.Pagination;

public interface ITodoService {
    Todo updateTodoById(Todo todo, long id);
    PageHolder<Todo> getTodos(Pagination pagination);
}