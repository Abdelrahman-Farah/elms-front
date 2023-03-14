
import React, { useState, useEffect } from 'react'

function StudentsInfo() {
  let counter = 1;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [studentInfoButton, setstudentInfoButton] = useState(false);
  const [students, setStudents] = useState("");

  async function fetchData() {
    await fetch("http://127.0.0.1:8000/dashboard/learner/", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
            setIsLoaded(true);
          setStudents(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderStudentInfo = () => {
    const studentsInfo = students.map((student) => {
      return (
        <tr key={counter}>
          <th scope="row">{counter++}</th>
          <td>{student['full_name']}</td>
          <td>{student['email']}</td>
          <td>{student['GPA']}</td>
        </tr>
      );
    });
    return studentsInfo;
  };

  const showInfo = (e) => {
    e.preventDefault();
    setstudentInfoButton(!studentInfoButton);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!studentInfoButton){
    return <button className="link-btn" onClick={showInfo}>Show Student Info</button>
  }
  else {
    return (
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">GPA</th>
          </tr>
        </thead>
        <tbody>{renderStudentInfo()}</tbody>
      </table>
    );
  }
}

export default StudentsInfo;