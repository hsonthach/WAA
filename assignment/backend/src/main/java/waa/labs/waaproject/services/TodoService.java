package waa.labs.waaproject.services;

import org.springframework.stereotype.Service;
import waa.labs.waaproject.models.Todo;
import waa.labs.waaproject.repositories.ITodoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import waa.labs.waaproject.models.PageHolder;
import waa.labs.waaproject.models.Pagination;
import waa.labs.waaproject.repositories.ITodoSearchRepository;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TodoService implements ITodoService {
    private final ITodoRepository todoRepository;
    private final ITodoSearchRepository searchRepository;

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

    @Override
    public PageHolder<Todo> getTodos(Pagination pagination) {
        Sort sorter = Sort.by(Sort.Direction.DESC, "id");
        if (Objects.nonNull(pagination.getSortBy())) {
            sorter = Sort.by(Sort.Direction.DESC, pagination.getSortBy());
        }

        Pageable pageable = PageRequest.of(pagination.getPage(), pagination.getSize(), sorter);
        Page<Todo> page = searchRepository.findAll(pageable);
        return new PageHolder<>(
            page.getContent(),
            page.getTotalPages()
        );
    }

    @Override
    public Todo saveOrUpdate(Todo toDo) {
        return todoRepository.save(toDo);
    }

    @Override
    public void deleteTodo(long id) {
        Todo removedTodo = todoRepository.findById(id).orElse(null);
        if (removedTodo != null) {
            todoRepository.deleteById(id);
        }
    }
}
