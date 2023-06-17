
import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import styles from './AuthStyles.module.css'

import card_top from '/src/assets/auth/card-top.png';

import { api_url } from '../../utils/getData';

function Register() {
    let { uid } = useParams();
    let { token } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isActivationFinished, setIsActivationFinished] = useState(false);

    const [errors, setErrors] = useState([]);

    async function fetchData() {
        await fetch(`${api_url}/auth/users/activation/`, {
            method: "POST",
            body: JSON.stringify({
                uid: uid,
                token: token
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                if (res.status == 204)
                    return ""
                else
                    throw res.json()
            })
            .then(
                (result) => {
                    setIsActivationFinished(true);
                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err) {
                    for (let key in err) {
                        let value = err[key];
                        setErrors(() => [...errors, value]);
                    }
                }
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (isActivationFinished) {
        return (
            <div className={styles['auth-bg']}>
                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />

                        <div className={`${styles['card-content']} mt-5`}>
                            <h2>Your Account has been Activated successfully!</h2>
                            <br />
                            <h4>
                                <p className={styles['new-member']}>
                                    <span>Now you can </span>
                                    <NavLink to='/login' className={styles['new-member-link']}>
                                        Log in
                                    </NavLink>
                                </p>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if (errors.length != 0) {
        return (
            <div className={styles['auth-bg']}>
                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />

                        <div style={{ "alsignItems": "start" }}>
                            <h2 style={{ "color": "red" }}>An error has occured while activating your account</h2>
                            <br></br>
                            <div>Details:</div>
                            {errors && errors.map(err => <p >{err}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={styles['auth-bg']}>

                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />
                        <h2 className={styles['word-register']}>Account Activation</h2>
                        <div className={styles['card-content']}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register