package controller;

import model.Student;
import view.StudentView;

import java.util.List;

public class StudentController {
    private Student student;
    private StudentView view;

    public StudentController(Student student, StudentView view) {
        this.student = student;
        this.view = view;
    }

}

