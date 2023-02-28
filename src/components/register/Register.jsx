import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const [isRegisterationFinished, setIsRegisterationFinished] = useState(false);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    async function fetchData() {
      await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username,
          password: pass,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          return res.json();
          console.log('a7a 1', res.status);
          if (res.status == 201)
            return res.json();
          else
            throw "Wrong credentials were provided!"
        })
        .then(
          (result) => {
            console.log('11111111'+result);
            setIsRegisterationFinished(true);
            setIsLoaded(true);
            alert('User has been created successfully!\nNow log in.')
            navigate("/login");
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchData();
    };


    // if (isRegisterationFinished)
    //   return <Route path="/login" element={<Login/>} />


    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="auth-form-container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" id="first_name" name="first_name" required/>

                <input value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" id="last_name" name="last_name" required/>

                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Email" id="email" name="email" required/>

                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Username" id="username" name="username" required/>

                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" required/>
                <button type="submit">Register</button>
            </form><br/><br/><br/>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Already have an account? Login here.</button>
        </div>
      );
    }
  }
export default Register