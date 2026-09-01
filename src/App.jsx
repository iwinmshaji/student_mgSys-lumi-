import { useEffect, useState } from "react";

import axios from "axios";

import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const getStudents = () => {

    axios.get("http://localhost:3000/students")
      .then((response) => {
        setStudents(response.data);
      });

  };



  useEffect(() => {
    getStudents();
  }, []);



  const addStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: id,
      name: name,
      age: age,
      course: course,
      email: email
    };



    axios.post("http://localhost:3000/students", newStudent)
      .then(() => {
        getStudents();
        setId("");
        setName("");
        setAge("");
        setCourse("");
        setEmail("");
      });

  };

  const deleteStudent = (id) => {
  axios.delete("http://localhost:3000/students/" + id)
   .then(() => {
        getStudents();
      });

  };



  return (
    <div className="container">
      
      <h1>Student Management System</h1>

      <form onSubmit={addStudent}>
        <input

          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}

        />

        <input
        
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input

          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input

          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input

          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />



        <button type="submit">Add Student</button>
      </form>
      <table>
        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Email</th>
            <th>Action</th>
          </tr>

        </thead>
        <tbody>


          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.email}</td>
              <td>


                <button onClick={() => deleteStudent(student.id)}>
                  Delete

                </button>
              </td>

            </tr>
          ))}



        </tbody>
      </table>
    </div>


  );
  
}
export default App;