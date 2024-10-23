package waa.labs.waaproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import waa.labs.waaproject.models.Todo;

import java.util.List;

@Repository
public interface ITodoRepository extends JpaRepository<Todo, Long> {
//    List<Todo> findByName(String name);
}
