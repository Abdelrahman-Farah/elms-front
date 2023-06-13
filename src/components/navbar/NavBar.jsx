import React from 'react'
import { NavLink } from 'react-router-dom';

import styles from "./NavBar.module.css";

import logo from '/src/assets/logo.svg';
import ELMS from '/src/assets/ELMS.svg';


function NavBar() {
  return (
    <nav className={styles.navbar}>
      <a className="" href="index.html">
        <img className={styles.logo_image} src={logo} />
        <img className={styles.logo_text} src={ELMS} />
      </a>

      <div className={styles.links}>
        <a className={styles.nav_link} href="#header">Home</a>
        <a className={styles.nav_link} href="#features">Features</a>
        <a className={styles.nav_link} href="#details">Details</a>
        <a className={styles.nav_link} href="#video">Video</a>

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