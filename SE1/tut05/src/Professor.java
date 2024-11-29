import java.util.*;

public class Professor {
    private String name;
    private String employeeId;
    private List<Department> departments = new ArrayList<>();
    private List<Course> courses = new ArrayList<>();

    public Professor(String name, String employeeId) {
        this.name = name;
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void assignToDepartment(Department department) {
        departments.add(department);
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void assignToCourse(Course course) {
        courses.add(course);
    }
}
