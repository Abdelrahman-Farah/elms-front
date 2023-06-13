import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { api_url, auth } from "../../../utils/getData";
import { checkIfOwner } from "../../../utils/getData";

import styles from './QuizResult.module.css'
import QuestionCard from './QuestionCard';

function getStatistics(questions) {
    let correct = 0;
    for (let question of questions) {
        let isCorrect = false;
        for (let answer of question['answers']) {
            if (answer['is_correct'] == true && answer['chosen'] == true) {
                isCorrect = true;
            }
        }

        if (isCorrect == true)
            correct++;
    }
    return correct;
}

function formatPoints(points) {
    var result = (points - Math.floor(points)) !== 0;

    if (result)
        return points;
    else
        return Math.floor(points);
}

function QuizResult() {
    let { courseId } = useParams();
    let { quiz_model_id } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [quizResult, setQuizResult] = useState({});
    const [error, setError] = useState(null);

    const [correctCounter, setCorrectCounter] = useState(0);
    const [wrongCounter, setWrongCounter] = useState(0);
    const [totalCounter, setTotalCounter] = useState(0);

    async function fetchQuizResult() {
        return await fetch(`${api_url}/dashboard/course/${courseId}/quiz-model/${quiz_model_id}/result/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": auth,
            },
        })
            .then((res) => {
                if (res.status == 200)
                    return res.json();

                else
                    throw res.json();
            })
            .then(
                (result) => {
                    setQuizResult(result);
                    return {
                        result: result,
                        status: 200,
                    };
                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err.status != 200) {
                    setError([err['detail']]);
                }

                setIsLoading(false);
                return err;
            })
    }

    useEffect(() => {
        checkIfOwner(courseId).then(
            (val) => {

                if (val == 1) {
                    let url = window.location.href;
                    url = url.replace('/result', '/all-students-results')
                    window.location.replace(url);
                }
            }
        )
        fetchQuizResult().then((data) => {
            if (data.status == 200) {
                let counter = getStatistics(data['result']['questions']);
                setCorrectCounter(counter)
                setWrongCounter(data['result']['questions'].length - counter)
                setTotalCounter(data['result']['questions'].length)
            }
        }
        );
    }, []);


    if (isLoading) {
        return <div className={styles['quiz-result-bg']}>
            <Spinner animation="border" variant="primary" style={{ width: "5.5rem", height: "5.5rem" }} />
        </div>
    }
    return (
        <div className={styles['quiz-result-bg']}>
            {error?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}
            {
                !error && (
                    <div className={styles['score-card-container']}>

                        <div className={styles['score-summary']}>

                            <div className={styles['score-left-card']}>
                                <h3 className={styles['score-header']}>Score</h3>

                                <div className={styles['score-count-container']} style={{ borderColor: "#4507ac", }}>
                                    <span>{formatPoints(quizResult['score'])}</span>
                                    <div className={styles['score-card-circle-divider']}></div>
                                    <span>{formatPoints(quizResult['total'])}</span>
                                </div>


                                <div className={`${styles['score-card-option-separator']} mt-4`}></div>

                                <div className={styles['score-card-result-row']}>
                                    <div className={styles['score-card-option-text']}>
                                        <div id="score-card-option-circle-indicator" className={styles['score-card-option-circle-indicator']} style={{ borderColor: "rgb(15, 157, 88)", }}></div>
                                        <span>Correct</span>
                                    </div>
                                    <span className={styles['score-card-correct-answer-percentage']}>{(correctCounter / totalCounter * 100).toFixed(2)}%</span>
                                    <span className={styles['score-card-correct-answer-count']}>Count = {correctCounter}</span>
                                </div>

                                <div className={styles['score-card-option-separator']}></div>


                                <div className={styles['score-card-result-row']}>
                                    <div className={styles['score-card-option-text']}>
                                        <div id="score-card-option-circle-indicator" className={styles['score-card-option-circle-indicator']} style={{ borderColor: "red", }}></div>
                                        <span>Wrong</span>
                                    </div>
                                    <span className={styles['score-card-correct-answer-percentage']}>{(wrongCounter / totalCounter * 100).toFixed(2)}%</span>
                                    <span className={styles['score-card-correct-answer-count']}>Count = {wrongCounter}</span>
                                </div>
                                <div className={styles['score-card-option-separator']}></div>
                            </div>



                        </div>

                        <div className={styles['questions']}>
                            {
                                quizResult?.['questions']?.map((question, index) => {
                                    return (
                                        <QuestionCard
                                            key={question.id}
                                            question={question}
                                            index={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default QuizResult