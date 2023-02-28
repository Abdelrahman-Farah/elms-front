import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

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
            <br/><br/><br/>
            <button className="link-btn" onClick={gotoRegister}>Sign Up</button>
        </>
    );
}
export default HomePage