import React, { useState } from 'react'
import Header from './header/Header';

import NavBar from '../navbar/NavBar'

import styles from './HomePage.module.css';



function HomePage() {

  return (
    <>
      <div className={styles['landing-bg']}>
        <NavBar></NavBar>
        <Header />
      </div>
    </>
  );
}
export default HomePage
