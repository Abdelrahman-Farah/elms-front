import React from 'react'

import styles from './QuizStyles.module.css';

import schedule from '/src/assets/quiz/quizzes/schedule.png'

function checkTime(start_date, end_date) {
    let start_time = new Date(start_date);
    let end_time = new Date(end_date);
    let current_time = new Date();


    if (current_time > end_date) {
        return -1;  // qiuz finished
    }
    else if (start_time <= current_time && current_time <= end_time) {
        return 0;   // quiz is going
    }
    else if (current_time < start_time) {
        return 1;   // quiz didn't start
    }
}

function getCardColor(time_state) {
    if (time_state == -1) {
        return "green";
    }
    else if (time_state == 0) {
        return "#ffc107";
    }
    else if (time_state == 1) {
        return "#0065b8";
    }
}

function QuizCard(props) {
    let start_date = props.quiz['start_date'].slice(0, -1);
    let date = start_date.slice(0, start_date.indexOf("T"));
    let time = start_date.slice(start_date.indexOf("T") + 1);
    time = time.substr(0, 5);

    let duration = props.quiz['duration_in_minutes'];

    let end_date = new Date(new Date(start_date).getTime() + duration * 60000);

    let time_state = checkTime(start_date, end_date);
    let card_color = getCardColor(time_state);

    return (
        <>
            <div
                className={styles['card']}
                style={{ border: `5px solid ${card_color}` }}
                onClick={() => {
                    if (time_state == -1){

                    }
                    else if (time_state == 0){
                        return window.open(`${window.location.href}/${props.quiz['id']}/take`, "_blank")
                    }
                    else if (time_state == 1){

                    }
                }}
            >

                <div className={`${styles['post-content']}`}>
                    <h2 className={styles['post-header']}> {props.quiz['title']} </h2>
                    <p className={`${styles['post-text']}`}>{props.quiz['description']}</p>
                    <div className={`${styles['post-image']}`}>
                        <img src={schedule} className={styles['author-image']} />
                        <div className={styles['author-content']}>
                            <p className={styles['date']}>
                                <b>Date: </b>
                                <span style={{ color: card_color }}>{date}</span>
                            </p>
                            <p className={styles['date']}>
                                <b>Time: </b>
                                <span style={{ color: card_color }}>{time}</span>
                            </p>
                            <p className={styles['date']}>
                                <b>Duration: </b>
                                {duration} Minutes
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles['quiz-state-outer']}>

                    <div className={styles['quiz-state-inner']}>
                        <h3>Status</h3>
                        <h2 style={{ color: card_color }}>
                            {time_state == -1 ? "Finished" : (time_state == 0 ? "on-going" : "Pending")}
                        </h2>
                        <p style={{ color: "grey", fontSize: "14px", margin: "0"}}>
                            {
                                time_state == -1 ? "Click to see your result!" :
                                time_state == 0 ? "Click now to take the quiz." :
                                ""
                            }
                        </p>

                    </div>
                </div>

            </div>
        </>
    )
}

export default QuizCard