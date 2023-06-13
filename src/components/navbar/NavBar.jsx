import React from 'react'
import { NavLink } from 'react-router-dom';

import styles from "./NavBar.module.css";

import logo from '/src/assets/logo.svg';
import ELMS from '/src/assets/ELMS.svg';


function NavBar() {
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img className={styles.logo_image} src={logo} />
        <img className={styles.logo_text} src={ELMS} />
      </a>

      <div className={styles.links}>
        <NavLink to='/' className={styles.nav_link}> Home </NavLink>
        <NavLink to='/' className={styles.nav_link}> Features </NavLink>
        <NavLink to='/' className={styles.nav_link}> Details </NavLink>
        <NavLink to='/' className={styles.nav_link}> Video </NavLink>


        <NavLink
          to='login'
          className={`${styles.btn} ${styles.login_btn}`}
        >
          Login
        </NavLink>
        <NavLink
          to='register'
          className={`${styles.btn} ${styles.signup_btn}`}
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar