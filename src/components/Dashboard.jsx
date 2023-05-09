import React, { useState, useEffect } from 'react'

function Dashboard() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    async function fetchData() {
      await fetch("http://127.0.0.1:8000/auth/users/me/", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "JWT " + localStorage.getItem("access_token")
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUsername(result['username']);
            setEmail(result['email']);
            setFirstName(result['first_name']);
            setLastname(result['last_name']);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div className="auth-form-container">
        <h1>Welcome, {firstName + " " + lastName}</h1>
        <h3>Your username is {username}</h3>
        <h3>Your email is {email}</h3>
      </div>
    }
}

export default Dashboard