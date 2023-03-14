import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import StudentsInfo from '../StudentsInfo';

function HomePage() {
  const navigate = useNavigate();

  const gotoLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const gotoRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <button className="link-btn" onClick={gotoLogin}>Log in</button>
      <br /><br /><br />
      <button className="link-btn" onClick={gotoRegister}>Sign Up</button>
      <br /><br /><br />
      <StudentsInfo/>
    </>
  );
}
export default HomePage
