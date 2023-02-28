import React, { useState } from 'react'
import BrowseCourses from '../courses/BrowseCourses';

function Login() {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    async function fetchData() {
      await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: pass,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          console.log('a7a 1', res.status);
          if (res.status == 200)
            return res.json();
          else
            throw "Wrong credentials were provided!"
        })
        .then(
          (result) => {
            setIsLoaded(true);
            setIsLoggedIn(true);
            localStorage.setItem('access_token', result['access']);
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


    if (isLoggedIn)
      return <BrowseCourses></BrowseCourses>


    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="auth-form-container">
            <h1>Welcome Back!</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Username" id="username" name="username" required/>

                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" required/>

                <button type="submit">Log In</button>
            </form>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
        </div>
      );
    }
  }
export default Login