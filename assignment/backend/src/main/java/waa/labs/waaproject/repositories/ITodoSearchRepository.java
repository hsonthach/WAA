package waa.labs.waaproject.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import waa.labs.waaproject.models.Todo;

@Repository
public interface ITodoSearchRepository extends PagingAndSortingRepository<Todo, Long> {
}
