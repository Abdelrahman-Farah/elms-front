import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import RenderQuestion from './RenderQuestion';

import styles from "./TakeQuiz.module.css";

import { Timer } from '../Timer';
import { api_url, auth } from "../../../utils/getData";

function TakeQuiz() {
    let { courseId } = useParams();
    let { quiz_model_id } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState(0);
    const { register, handleSubmit, setError, formState: { errors }, control } = useForm();

    function getEndDate() {
        let start_date = data['start_date'];
        let duration = data['duration_in_minutes'];
        let end_date = new Date(new Date(start_date).getTime() + duration * 60000);
        return end_date;
    }

    async function fetchExistedQuiz() {
        return await fetch(`${api_url}/dashboard/course/${courseId}/quiz-model/${quiz_model_id}/take/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": auth,
            },
        })
            .then((res) => {
                if (res.status == 200)
                    return res.json();

                else if (res.status == 204)
                    throw 204;

                else
                    throw res.json();
            })
            .then(
                (result) => {
                    setData(result);
                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err == 204)
                    return err

                if (err) {
                    for (let key in err) {
                        let value = err[key];
                        setError(key, { type: 'custom', message: [value] });
                    }
                    setError('detail', { type: 'custom', message: [err['detail']] });
                }

                setIsLoading(false);
                return 200;
            })
    }

    async function createNewQuiz() {
        return await fetch(`${api_url}/dashboard/course/${courseId}/quiz-model/${quiz_model_id}/take/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": auth,
            },
        })
            .then((res) => {
                if (res.status == 200)
                    return res.json();

                else if (res.status == 204)
                    throw 204;

                else
                    throw res.json();
            })
            .then(
                (result) => {
                    setData(result);
                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err == 204)
                    return err

                if (err) {
                    for (let key in err) {
                        let value = err[key];
                        setError(key, { type: 'custom', message: [value] });
                    }
                }
                setIsLoading(false);
                return 200;
            })
    }

    useEffect(() => {
        fetchExistedQuiz().then((status) => {
            if (status == 204) {
                createNewQuiz();
            }
        });
    }, []);

    const [isSubmitted, setIsSubmitted] = useState(false);
    async function submitSolutions(data) {
        await fetch(`${api_url}/dashboard/course/${courseId}/quiz-model/${quiz_model_id}/submit/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": auth,
            },
        }).then((res) => {
            setIsLoading(false);
            setIsSubmitted(true);
        })
    }

    if (isSubmitted) {
        return (
            <div className={styles['take-quiz-bg']}>
                <div className={styles['submit-success']}>
                    <h2>You have submitted the quiz Successfully</h2>
                </div>

            </div>
        )

    }
    if (isLoading) {
        return (
            <div className={styles['take-quiz-bg']}>
                <div className={styles.quiz}>
                    <Spinner animation="border" variant="primary" style={{ width: "5.5rem", height: "5.5rem" }} />
                </div>
            </div>
        )

    } else {
        return (
            <div className={styles['take-quiz-bg']}>
                {errors?.['detail']?.message?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}
                {
                    !errors?.['detail'] ?
                        <>
                            <div className={styles['timer']}>
                                <Timer expiryTimestamp={getEndDate()} />
                            </div>
                            <form
                                className={styles.quiz}
                                onSubmit={handleSubmit((solutions) => {
                                    setIsLoading(true);
                                    solutions['quiz_id'] = data['id']

                                    for (let i = 0; i < data['random_questions'].length; i++) {
                                        solutions['random_questions_and_answers'][i]['random_question'] = data['random_questions'][i]['random_question_id']
                                    }
                                    submitSolutions(solutions);
                                })}
                            >
                                {data['random_questions'].map((question, index) => {
                                    return <RenderQuestion
                                        key={question.id}

                                        control={control}

                                        index={index}

                                        register={register}
                                        base_str={`random_questions_and_answers.${index}`}

                                        question={question}
                                    />
                                })}
                                <button type="submit" className={styles['submit-quiz-solutions-btn']}>Submit</button>
                            </form>
                        </>
                        : null
                }

            </div>

        );
    }
}

export default TakeQuiz