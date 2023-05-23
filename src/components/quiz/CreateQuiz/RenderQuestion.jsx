import React from 'react'
import styles from "./CreateQuiz.module.css";
import { set, useFieldArray } from "react-hook-form";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import RenderAnswer from './RenderAnswer'

function RenderQuestion(props) {
  const { fields, append, remove } = useFieldArray({
    name: `${props.base_str}.answers`,
    control: props.control,
  });


  return (
    <>
      <span className={props.errors && styles['question-btn-error']}>
        <Accordion.Item eventKey={`${props.base_str}`}>

          <Accordion.Header className={styles['question-header']}>
            <span>Question Item #{`${props.index + 1}`}</span>
            <Button as='div' variant="danger" onClick={() => props.remove(props.index)}>
              Delete Question
            </Button>
          </Accordion.Header>

          <Accordion.Body>
            {props?.errors?.message?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}

            <div className={styles.question}>
              <div className='d-flex'>
                <span>
                  <div className={`${props?.errors?.['body'] && styles['input-error']}`}>
                    <label className={styles.label} htmlFor={`${props.base_str}.question_body`}>Question body</label>
                    <input className={styles['large-input']} type="text" id={`${props.base_str}.question_body`} {...props.register(`${props.base_str}.body`)} />
                    {props?.errors?.['body']?.message?.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
                  </div>
                </span>
                <span className='ms-5'>
                  <div className={`${props?.errors?.['points'] && styles['input-error']}`}>
                    <label className={styles.label} htmlFor={`${props.base_str}.points`}>Points if correct</label>
                    <input className={styles['small-input']} type="number" id={`${props.base_str}.points`} {...props.register(`${props.base_str}.points`)} />
                    {props?.errors?.['points']?.message?.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
                  </div>
                </span>

              </div>

              <div>
                {fields.map((answer, index) => {
                  return <RenderAnswer
                    key={answer.id}

                    control={props.control}

                    remove={remove}
                    index={index}

                    register={props.register}
                    question={`${props.base_str}.answers`}
                    base_str={`${props.base_str}.answers.${index}`}
                    errors={props?.errors?.[`answers`]?.[index]}
                  />
                })}
                <button className={`${styles['append-answer-btn']} ms-5`} type="button" onClick={() => { append() }}>Append Answer</button>

              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </span>
    </>

  )
}

export default RenderQuestion