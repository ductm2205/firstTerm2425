package se1.tut10.controller;


import org.springframework.web.bind.annotation.*;
import se1.tut10.model.Student;
import se1.tut10.repository.StudentRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/")
    public List<Student> viewStudentsList() {
        return studentRepository.findAll();
    }

    @GetMapping("/detail/{id}")
    public Student viewStudentById(@PathVariable(value = "id") Long id) {
        return studentRepository.findById(id).get();
    }

    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/update/{id}")
    public void updateStudent(@PathVariable(value = "id") Long id, @RequestBody Student student) {
        if (studentRepository.existsById(id)) {
            student.setId(id);
            studentRepository.save(student);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable(value = "id") Long id) {
        if (studentRepository.existsById(id)) {
            Student student = studentRepository.findById(id).get();
            studentRepository.delete(student);
        }
    }
}
