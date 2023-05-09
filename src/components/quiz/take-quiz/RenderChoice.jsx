import React from 'react'

import styles from "./TakeQuiz.module.css";

function RenderChoice(props) {
  return (
    <div className={styles.choice}>
      <input className="form-check-input" type="radio" name={props.base_str} id={props.base_str+props.index} {...props.register(`${props.base_str}.answer`)} value={props['answer']['id']} required/>
      <label className={styles.label} htmlFor={props.base_str+props.index}>
        {props['answer']['body']}
      </label>
      {/* <input className={styles.input} type="radio" id="huey" name="drone" value="huey"/>
      <label className={styles.label} htmlFor="huey">{props['answer']['body']}</label> */}
    </div>
  )
}

export default RenderChoice