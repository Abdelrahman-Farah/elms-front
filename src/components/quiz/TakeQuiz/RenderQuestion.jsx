import React from 'react'
import styles from "./TakeQuiz.module.css";
import { useFieldArray } from "react-hook-form";

import RenderChoices from './RenderChoice'
function RenderQuestion(props) {
  const { fields, append, remove } = useFieldArray({
    name: props.base_str,
    control: props.control,
  });

  return (
    <div className={styles.question}>
      <div className={styles.question_body}>{props['question']['body']}</div>
      <div className={styles.answers}>
        {props['question']['choices'].map((answer, index) => {

          return <RenderChoices
            key={answer.id}

            control={props.control}

            index={index}

            register={props.register}
            base_str={props.base_str}

            answer={answer}
          />
        })}
      </div>
    </div>
  )
}

export default RenderQuestion