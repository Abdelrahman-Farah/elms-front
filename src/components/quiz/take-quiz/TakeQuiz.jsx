import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from "react-hook-form";

import RenderQuestion from './RenderQuestion';

import styles from "./TakeQuiz.module.css";

function TakeQuiz() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [questions, setQuestions] = useState(null);
    const { register, handleSubmit, control } = useForm();

    // TODO : change quiz_id
    const quiz_id = '14';
    async function fetchData() {
        await fetch(`http://127.0.0.1:8000/quiz/`, {
            method: "POST",
            body: JSON.stringify({
                quiz_model_id: quiz_id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "JWT " + localStorage.getItem("access_token")
            },
        })
            .then((res) => {

                if (res.status == 200)
                    return res.json();
                else if (res.status == 401)
                    throw Error("You must log in to take a quiz")
                else
                    throw Error("Error has occured :(")
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    setQuestions(result['random_questions']);
                    register('quiz_id')
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function submitSolutions(data) {
        await fetch("http://127.0.0.1:8000/quiz/submit/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {

            })
            .then(
                // (result) => {
                //     setIsLoaded(true);
                //     localStorage.setItem('access_token', result['access']);
                // },
                // (error) => {
                //     setIsLoaded(true);
                //     setError(error);
                // }
            );
    }


    if (error) {
        return <div className={styles.quiz}>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={styles.quiz}>Loading...</div>;
    } else {
        return (
            <form
                className={styles.quiz}
                onSubmit={handleSubmit((data) => {
                    data['quiz_id'] = 228

                    for (let i = 0; i < questions.length; i++) {
                        data['questions_answers'][i]['question'] = questions[i]['question']['id']
                    }

                    submitSolutions(data);
                })}
            >
                {questions.map((question, index) => {
                    return <RenderQuestion
                        key={question.id}

                        control={control}

                        index={index}

                        register={register}
                        base_str={`questions_answers.${index}`}

                        question={question['question']}
                    />
                })}
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default TakeQuiz