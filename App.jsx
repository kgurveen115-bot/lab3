import React, { useState } from "react";
import "./App.css";

function Header() {
  return (
    <div className="header">
      <h1>Student Performance Board</h1>
      <p>Track marks and result status</p>
    </div>
  );
}

function StudentRow({ student, index, updateScore }) {
  const result = student.score >= 40 ? "Pass" : "Fail";

  return (
    <tr>
      <td>{student.name}</td>
      <td>
        <input
          type="number"
          value={student.score}
          onChange={(e) => updateScore(index, Number(e.target.value))}
        />
      </td>
      <td className={result === "Pass" ? "pass" : "fail"}>
        {result}
      </td>
    </tr>
  );
}

function StudentTable({ students, updateScore }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Marks</th>
          <th>Result</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student, index) => (
          <StudentRow
            key={index}
            student={student}
            index={index}
            updateScore={updateScore}
          />
        ))}
      </tbody>
    </table>
  );
}

function AddStudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || score === "") return;

    addStudent({
      name,
      score: Number(score),
    });

    setName("");
    setScore("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Marks"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default function App() {
  const [students, setStudents] = useState([
    { name: "Riya", score: 85 },
    { name: "Karan", score: 32 },
    { name: "Sneha", score: 61 },
  ]);

  const updateScore = (index, newScore) => {
    const updated = [...students];
    updated[index].score = newScore;
    setStudents(updated);
  };

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="container">
      <Header />
      <AddStudentForm addStudent={addStudent} />
      <StudentTable students={students} updateScore={updateScore} />
    </div>
  );
}