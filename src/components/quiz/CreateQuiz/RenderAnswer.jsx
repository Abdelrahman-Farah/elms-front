import React from 'react'
import styles from "./CreateQuiz.module.css";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function RenderAnswer(props) {
  return (
    <div className={styles.answer}>
      <div className='d-flex  align-items-end'>
        <span >
          <div className={`${props?.errors?.['body'] && styles['input-error']}`}>
            <label className={styles.label} htmlFor={`${props.base_str}.answer_body`}>Answer #{props.index + 1}</label>
            <input className={styles['mid-input']} type="text" id={`${props.base_str}.answer_body`} {...props.register(`${props.base_str}.body`)} />
            {props?.errors?.['body']?.message?.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
          </div>
        </span>
        <span className='mt-1 ms-5'>
          <div className={`${props?.errors?.['is_correct'] && styles['input-error']}`}>
            <label className={`${styles.label} d-block`} htmlFor={`${props.base_str}.is_correct`}>Is correct?</label>
            <input className='form-check-input' type="checkbox" id={`${props.base_str}.is_correct`}  {...props.register(`${props.base_str}.is_correct`)} />
            {props?.errors?.['is_correct']?.message?.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
          </div>
        </span>
        <span className='mt-1 ms-5 mb-1'>
          <Button as='div' variant="danger" onClick={() => props.remove(props.index)}>
            ✕
          </Button>
        </span>
      </div>
    </div>
  )
}

export default RenderAnswer