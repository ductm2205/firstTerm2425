import java.util.*;

public class Student {
    private String name;
    private String studentId;
    private List<Course> courses = new ArrayList<>();

    public Student(String name, String studentId) {
        this.name = name;
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public String getStudentId() {
        return studentId;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void attendCourse(Course course) {
        courses.add(course);
    }
}
