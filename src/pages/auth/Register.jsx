import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";

import Spinner from 'react-bootstrap/Spinner';

import styles from './AuthStyles.module.css'

import card_top from '/src/assets/auth/card-top.png';

import { api_url } from '../../utils/getData';

function Register() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterationFinished, setIsRegisterationFinished] = useState(false);

  async function fetchData(data) {
    await fetch(`${api_url}/auth/users/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status == 201)
          return res.json();
        else
          throw res.json()
      })
      .then(
        (result) => {
          setIsRegisterationFinished(true);

        },
        (error) => {
          // setError(error);
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

  if (isRegisterationFinished) {
    return (
      <div className={styles['auth-bg']}>
        <div className={styles['auth-cards']} >
          <div className={styles['register-form-card']}>
            <img src={card_top} className={styles['form-card-top-image']} alt="" />

            <div className={styles['card-content']}>
              <h2 className='mt-5'>User has been created successfully!</h2>
              <br />
              <h4>Check your mail to Activate your account.</h4>
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
          <div className={styles['register-form-card']}>
            <img src={card_top} className={styles['form-card-top-image']} alt="" />
            <h2 className={styles['word-register']}>Register</h2>
            <form className={styles['register-form']} onSubmit={handleSubmit((data) => {
              setIsLoading(true);
              fetchData(data)
            })}>
              <input {...register("first_name")} placeholder="First Name" id="first_name" name="first_name" required />

              <input {...register("last_name")} placeholder="Last Name" id="last_name" name="last_name" required />

              <input {...register("email")} className={`${errors.email && styles['input-error']}`} type="email" placeholder="Email" id="email" name="email" required />
              {errors.email && errors.email.message.map(err => <p className={styles['error-msg']}>{err}</p>)}

              <input {...register("username")} className={`${errors.username && styles['input-error']}`} type="username" placeholder="Username" id="username" name="username" required />
              {errors.username && <p className={styles['error-msg']}>{errors.username.message}</p>}

              <input {...register("password")} className={`${errors.password && styles['input-error']}`} type="password" placeholder="Password" id="password" name="password" required />
              {errors.password && errors.password.message.map(err => <p className={styles['error-msg']}>{err}</p>)}

              <button className={styles['auth-btn']}>Register</button>
            </form>
            <p className={styles['new-member']} >
              <span>Already have an account? </span>
              <NavLink to='/login' className={styles['new-member-link']}>
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Register