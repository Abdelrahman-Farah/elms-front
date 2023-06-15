import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";

import Spinner from 'react-bootstrap/Spinner';

import styles from './AuthStyles.module.css'

import card_top from '/src/assets/auth/card-top.png';
import reset_password_img from '../../assets/auth/reset-password.png';

import { api_url } from '../../utils/getData';

function ResetPassword() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitFinished, setIsSubmitFinished] = useState(false);

    async function fetchData(data) {
        await fetch(`${api_url}/core/users/reset_password/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                if (res.status == 204) {
                    setIsSubmitFinished(true);
                }
                else {
                    throw res.json()
                }
            }).then(
                (result) => {

                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err) {
                    for (let key in err) {
                        let value = err[key];
                        setError(key, { type: 'custom', message: value });
                    }
                }
                setIsLoading(false);
            })
    }

    if (isSubmitFinished) {
        return (
            <div className={styles['auth-bg']}>
                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />

                        <img className={styles['reset-password-img']} src={reset_password_img} />

                        <h5 style={{ textAlign: 'center' }}>If the entered email is registered in our database, then a mail will be sent to you to reset your password.</h5>
                        <p className={styles['new-member']} >
                            <span>Go to </span>
                            <NavLink to='/' className={styles['new-member-link']}>
                                Home Page
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    else if (isLoading) {
        return (
            <div className={styles['auth-bg']}>
                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />

                        <div className={styles['card-content']}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles['auth-bg']}>

                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']} >
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />
                        <h2 className={`mb-0 ${styles['word-register']}`}>Reset Your Password</h2>
                        <img className={styles['reset-password-img']} src={reset_password_img} />
                        <form className={styles['register-form']} onSubmit={handleSubmit((data) => {
                            setIsLoading(true);
                            fetchData(data)
                        })}>

                            <input {...register("email")} className={`${errors.email && styles['input-error']}`} type="email" placeholder="Enter Your Email" id="email" name="email" required />
                            {errors.email && errors.email.message.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}

                            <button className={styles['auth-btn']}>Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default ResetPassword