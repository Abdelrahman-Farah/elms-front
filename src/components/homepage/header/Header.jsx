import React from 'react'

import styles from './Header.module.css';

import header_bulb_table from '/src/assets/header/header-bulb-table.png';

function Header() {
    return (
        <header id="header" className={styles.header}>
            <div className={`container `}>
                <div className={`${styles.row} row `}>
                    <div className={`${styles.main_text} col-lg-6 col-xl-5`}>
                        <div className="text-container">
                            <h1>Welcome to Discover New Features Of Online Learning</h1>
                            <p className="p-large">We look forward to a unique experience for users as we provide e-learning services
                                with advanced features over other applications.</p>


                            <button className={styles.create_class_btn}>Create your Classroom Now!</button>
                        </div>
                    </div>

                    <span className={styles.header_image}>
                        <img className={`col-lg-6 col-xl-7`} src={header_bulb_table} />
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header