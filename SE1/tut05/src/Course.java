import java.util.*;

public class Course {
    private String name;
    private int year;
    private Department department;
    private List<Professor> professors = new ArrayList<>();
    private List<Student> students = new ArrayList<>();

    public Course(String name, int year) {
        this.name = name;
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public int getYear() {
        return year;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Professor> getProfessors() {
        return professors;
    }

    public void assignProfessor(Professor professor) {
        professors.add(professor);
    }

    public List<Student> getStudents() {
        return students;
    }

    public void addStudent(Student student) {
        students.add(student);
    }
}
