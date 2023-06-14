import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styles from './AuthStyles.module.css'

import card_top from '/src/assets/auth/card-top.png';
import login_img_card from '/src/assets/auth/login-img-card.png';
import email_sent from '/src/assets/auth/email-sent.png';

import { api_url } from '../../utils/getData';

function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors }, clearErrors } = useForm();

  const [showResendCodeModal, setShowResendCodeModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(data) {
    await fetch(`${api_url}/core/jwt/create/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
        else if (res.status == 403) {
          setShowResendCodeModal(true)
          throw res.json();
        }
        else {
          throw res.json();
        }
      }
      )
      .then(
        (result) => {
          localStorage.setItem('access_token', result['access']);
          navigate('/');
          window.location.reload();
        },
        (error) => {
          return error
        }
      ).then((err) => {
        if (err) {
          setError('login', { type: 'custom', message: err })
        }
        setIsLoading(false);
      });
  }

  const handleClose = () => setShowResendCodeModal(false);
  const handleShow = () => setShowResendCodeModal(true);

  if (isLoading) {
    return (
      <div className={styles['auth-bg']}>
        <div className={styles['auth-cards']}>
          <div className={styles['image-card']}>
            <img src={login_img_card} alt="Login" />
            <h2>Login to join our Community</h2>
          </div>
          <div className={styles['login-form-card']}>
            <img src={card_top} className={styles['form-card-top-image']} alt="" />
            <h2 className={styles['welcome']}>Welcome Back!</h2>
            <div className={styles['card-content']}>
              <Spinner animation="border" variant="primary" />
            </div>
          </div>
        </div>
      </div>

    );
  } else {
    return (


      <>
        <div className={styles['auth-bg']}>

          <div className={styles['auth-cards']}>

            <div className={styles['image-card']}>
              <img src={login_img_card} alt="Login" />
              <h2>Login to join our Community</h2>
            </div>

            <div className={styles['login-form-card']}>
              <img src={card_top} className={styles['form-card-top-image']} alt="" />

              <h2 className={styles['welcome']}>Welcome Back!</h2>

              <form className={styles['login-form']} onSubmit={handleSubmit((data) => {
                setIsLoading(true);
                fetchData(data)
              })}>
                <div>
                  <input {...register("username")} type="text" placeholder="Username" id="username" name="username" required />

                  <input {...register("password")} type="password" placeholder="Password" id="password" name="password" required />

                  <NavLink to='/reset-password' className={styles['forgot']}>
                    <div className="forgot" >Forget Password?</div>
                  </NavLink>

                </div>

                <button className={styles['auth-btn']} type="submit" onClick={() => { clearErrors(); }}>Log In</button>
                {errors['login'] && <p className={styles['error-msg']}>{errors['login'].message}</p>}

              </form>


              <p className={styles['new-member']} >
                <span>New Member? </span>
                <NavLink to='/register' className={styles['new-member-link']}>
                  sign up
                </NavLink>
              </p>

            </div>

          </div>
        </div>


        <Modal show={showResendCodeModal} onHide={handleClose} size="md" centered >
          <Modal.Body>
            <div className={styles['activation-modal']}>
              <img className={styles['reset-password-img']} src={email_sent} />

              <h2 className='mb-5'>Your account is not active</h2>
              <h5>An email with Activation link is sent to you again</h5>
              <h5 className='mb-5'>Please confirm the activation before logging in</h5>
              <Button variant="primary" onClick={handleClose}>
                Ok
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default Login