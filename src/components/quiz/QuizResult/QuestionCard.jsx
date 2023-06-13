import React from 'react'

import styles from './QuizResult.module.css'

function getAnswerState(answers) {
    let chosen = 'No Chosen Answer';
    let correct = '';

    for (let answer of answers) {
        if (answer['is_correct'] == true && answer['chosen'] == true) {
            return [1, answer['body']];
        }
        else if (answer['chosen'] == true) {
            chosen = answer['body'];
        }
        else if (answer['is_correct'] == true) {
            correct = answer['body'];
        }
    }

    return [0, chosen, correct];
}

function formatPoints(points) {
    var result = (points - Math.floor(points)) !== 0;

    if (result)
        return points;
    else
        return Math.floor(points);
}

function QuestionCard(props) {
    const answer_state = getAnswerState(props['question']['answers']);
    const points = formatPoints(props['question']['points']);

    return (
        <div className={styles['individual-response-question-card']}>
            <div className={styles['question-title-container']}>
                <p className={styles['answer-sheet-response-question-title']}>
                    {props['index'] + 1}. {props['question']['body']}
                </p>
                <div style={{ color: answer_state[0] ? "green" : "red" }}>
                    {answer_state[0] ? points : 0}/{points} Marks
                </div>
            </div>

            <div className={styles['answer-body']} style={{ color: answer_state[0] ? "green" : "red" }}>
                <span className={styles['correct-answer']}>Your Answer: </span>
                <p style={{ display: "inline" }}>{answer_state[1]}</p>
            </div>

            {
                answer_state[0] == false
                    ? <div style={{marginTop: "12px"}}>
                        <span className={styles['correct-answer']}>Correct Answer: </span>
                        <span className={styles['correct-answer-body']} style={{ display: "inline" }}>{answer_state[2]}</span>
                    </div>
                    : null
            }


        </div>
    )
}

export default QuestionCard