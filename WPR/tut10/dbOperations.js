const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    console.log("Connected to the database");
    return client.db("school");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
}

async function insertStudents(db) {
  await db.collection("students").insertMany([
    { name: "John", age: 22, major: "Math" },
    { name: "Anna", age: 20, major: "Computer Science" },
    { name: "Mike", age: 21, major: "Physics" },
  ]);
}

async function insertCourses(db) {
  await db.collection("courses").insertMany([
    { course_name: "Database Systems", credit_hours: 4 },
    { course_name: "Operating Systems", credit_hours: 3 },
    { course_name: "Artificial Intelligence", credit_hours: 4 },
  ]);
}

async function queryAllStudents(db) {
  const students = await db.collection("students").find().toArray();
  console.log("All students:", students);
}

async function queryAllCourses(db) {
  const courses = await db.collection("courses").find().toArray();
  console.log("All courses:", courses);
}

async function queryStudent(db, name) {
  const student = await db.collection("students").findOne({ name });
  console.log(`Student ${name}:`, student);
}

async function queryCourse(db, name) {
  const course = await db.collection("courses").findOne({ course_name: name });
  console.log(`Course ${name}:`, course);
}

async function updateStudentMajor(db, name, newMajor) {
  await db
    .collection("students")
    .updateOne({ name }, { $set: { major: newMajor } });
  console.log(`Updated ${name}'s major to ${newMajor}`);
}

async function upsertStudent(db, name, data) {
  await db
    .collection("students")
    .updateOne({ name }, { $set: data }, { upsert: true });
  console.log(`Upserted student ${name}`);
}

async function deleteStudent(db, name) {
  await db.collection("students").deleteOne({ name });
  console.log(`Deleted student ${name}`);
}

async function deleteCourses(db) {
  await db.collection("courses").deleteMany({});
  console.log("Deleted all courses");
}

async function queryStudentsOlderThan(db, age) {
  const students = await db
    .collection("students")
    .find({ age: { $gt: age } })
    .toArray();
  console.log(`Students older than ${age}:`, students);
}

async function queryStudentsByMajor(db, major) {
  const students = await db.collection("students").find({ major }).toArray();
  console.log(`Students majoring in ${major}:`, students);
}

async function querySortedStudents(db) {
  const students = await db
    .collection("students")
    .find()
    .sort({ age: 1 })
    .limit(2)
    .toArray();
  console.log("Sorted students:", students);
}

module.exports = {
  connectToDatabase,
  insertStudents,
  insertCourses,
  queryAllStudents,
  queryAllCourses,
  queryStudent,
  queryCourse,
  updateStudentMajor,
  upsertStudent,
  deleteStudent,
  deleteCourses,
  queryStudentsOlderThan,
  queryStudentsByMajor,
  querySortedStudents,
};
