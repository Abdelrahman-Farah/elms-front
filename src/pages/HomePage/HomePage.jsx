import { useState } from 'react';

import NavBar from '../../components/navbar/NavBar';
import Header from './Header/Header';

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
export default HomePage;
