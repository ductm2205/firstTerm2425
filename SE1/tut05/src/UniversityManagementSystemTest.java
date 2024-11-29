import org.junit.jupiter.api.*;
import static org.mockito.Mockito.*;
import java.util.*;

class UniversityManagementSystemTest {
    private UniversityManagementSystem system;
    private Professor mockProfessor;

    @BeforeEach
    void setUp() {
        system = new UniversityManagementSystem();
        mockProfessor = mock(Professor.class);
    }

    @Test
    void testAssignProfessorToCourse() {
        Professor professor = system.createProfessor("Dr. John", "P123");
        Course course = system.createCourse("Math 101", 2023);
        system.assignProfessorToCourse(professor, course);

        Assertions.assertTrue(course.getProfessors().contains(professor));
        Assertions.assertTrue(professor.getCourses().contains(course));
    }
}
