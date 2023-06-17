
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';

import { useForm } from "react-hook-form";

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import styles from './AuthStyles.module.css'

import card_top from '/src/assets/auth/card-top.png';
import confirm_reset_password_img from '/src/assets/auth/confirm-password-reset.png';

import { api_url } from '../../utils/getData';

function ConfirmResetPassword() {
    let { uid } = useParams();
    let { token } = useParams();

    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [isActivationFinished, setIsActivationFinished] = useState(false);

    // const [errors, setErrors] = useState([]);

    async function fetchData(data) {
        await fetch(`${api_url}/auth/users/reset_password_confirm/`, {
            method: "POST",
            body: JSON.stringify({
                uid: uid,
                token: token,
                new_password: data['new_password'],
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
                        setError(key, { type: 'custom', message: value });
                    }
                }
                setIsLoading(false);
            })
    }


    if (isActivationFinished) {
        return (
            <div className={styles['auth-bg']}>
                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />

                        <div className={`${styles['card-content']} mt-5`}>
                            <h2>Your Password has changed successfully!</h2>
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

    else if (isLoading) {
        return (
            <div className={styles['auth-bg']}>
                <div className={styles['auth-cards']} >
                    <div className={styles['register-form-card']}>
                        <img src={card_top} className={styles['form-card-top-image']} alt="" />
                        <h2 className={`${styles['word-register']} mt-4`}>Confirm Reset Password</h2>
                        <div className={styles['card-content']}>
                            <Spinner animation="border" variant="primary" />
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
                        <h2 className={`${styles['word-register']} mt-4`}> Confirm Reset Password</h2>

                        {errors['uid']?.message?.map(err => <Alert key={err} variant='danger'> {err}<br />{`Please check the link.`}  </Alert>)}
                        {errors['token']?.message?.map(err => <Alert key={err} variant='danger'> {err}<br />{`Please check the link.`}  </Alert>)}

                        <img className={styles['reset-password-img']} src={confirm_reset_password_img} />

                        <form className={styles['register-form']} onSubmit={handleSubmit((data) => {
                            setIsLoading(true);
                            fetchData(data)
                        })}>

                            <input {...register("new_password")} className={`${errors['new_password'] && styles['input-error']}`} type="text" placeholder="Enter New Password" id="password" name="new_password" required />
                            {errors['new_password'] && errors['new_password'].message.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}

                            <button className={styles['auth-btn']}>Change password</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default ConfirmResetPassword