import java.util.*;

public class UniversityManagementSystem {
    private List<Department> departments = new ArrayList<>();
    private List<Professor> professors = new ArrayList<>();
    private List<Course> courses = new ArrayList<>();
    private List<Student> students = new ArrayList<>();

    // Create new entities
    public Department createDepartment(String name) {
        Department department = new Department(name);
        departments.add(department);
        return department;
    }

    public Professor createProfessor(String name, String employeeId) {
        Professor professor = new Professor(name, employeeId);
        professors.add(professor);
        return professor;
    }

    public Course createCourse(String name, int year) {
        Course course = new Course(name, year);
        courses.add(course);
        return course;
    }

    public Student createStudent(String name, String studentId) {
        Student student = new Student(name, studentId);
        students.add(student);
        return student;
    }

    // Relationships
    public void assignProfessorToDepartment(Professor professor, Department department) {
        professor.assignToDepartment(department);
        if (department.getHead() == null) {
            department.setHead(professor);
        }
    }

    public void assignCourseToDepartment(Course course, Department department) {
        course.setDepartment(department);
        department.addCourse(course);
    }

    public void assignProfessorToCourse(Professor professor, Course course) {
        course.assignProfessor(professor);
        professor.assignToCourse(course);
    }

    public void addStudentToCourse(Student student, Course course) {
        course.addStudent(student);
        student.attendCourse(course);
    }

    // Search
    public List<Course> searchCoursesByProfessor(Professor professor) {
        return professor.getCourses();
    }

    public List<Course> searchCoursesByStudent(Student student) {
        return student.getCourses();
    }

    public List<Professor> searchProfessorsByCourse(Course course) {
        return course.getProfessors();
    }

    public List<Student> searchStudentsByCourse(Course course) {
        return course.getStudents();
    }
}
