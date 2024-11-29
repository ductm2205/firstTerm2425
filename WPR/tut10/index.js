const dbOperations = require("./dbOperations");

async function main() {
  const db = await dbOperations.connectToDatabase();

  // Insert students and courses
  await dbOperations.insertStudents(db);
  await dbOperations.insertCourses(db);

  // Query all students and courses
  await dbOperations.queryAllStudents(db);
  await dbOperations.queryAllCourses(db);

  // Query specific student and course
  await dbOperations.queryStudent(db, "Anna");
  await dbOperations.queryCourse(db, "Database Systems");

  // Update a student's major
  await dbOperations.updateStudentMajor(db, "John", "Statistics");

  // Upsert a new student
  await dbOperations.upsertStudent(db, "Tom", {
    name: "Tom",
    age: 23,
    major: "Economics",
  });

  // Delete a student
  await dbOperations.deleteStudent(db, "Mike");

  // Delete all courses
  await dbOperations.deleteCourses(db);

  // Query students older than 20
  await dbOperations.queryStudentsOlderThan(db, 20);

  // Query students by major
  await dbOperations.queryStudentsByMajor(db, "Computer Science");

  // Query sorted students
  await dbOperations.querySortedStudents(db);
}

main();
