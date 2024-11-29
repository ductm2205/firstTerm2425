package se1.tut10.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se1.tut10.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
