import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from 'react-router-dom';

import RenderSet from "./RenderSet";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import styles from "./CreateQuiz.module.css";

import plus_icon from '/src/assets/quiz/create/plus-icon.svg'

import { api_url, auth } from "../../../utils/getData";
import { checkIfOwner } from "../../../utils/getData";

function CreateQuiz() {
    let { courseId } = useParams();

    const { register, handleSubmit, control, setError, formState: { errors }, clearErrors } = useForm();
    const { fields, append, remove } = useFieldArray({
        name: "difficulty_sets",
        control,
    });


    const [isLoading, setIsLoading] = useState(true);
    const [isCreationFinished, setIsCreationFinished] = useState(false);

    const [openLast, setOpenLast] = useState(false);


    async function createQuiz(data) {
        await fetch(`${api_url}/dashboard/course/${courseId}/quiz-model/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": auth,
            },
        })
            .then((res) => {
                if (res.status == 201)
                    return res.json();
                else
                    throw res.json()
            })
            .then(
                (result) => {
                    setIsCreationFinished(true)
                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err) {
                    let quiz_base = '';
                    let quiz = err

                    if (quiz['non_field_errors']) {
                        let value = quiz['non_field_errors'];
                        setError('quiz', { type: 'custom', message: value });
                    }
                    delete quiz['non_field_errors']
                    if (quiz['detail']) {
                        let value = quiz['detail'];
                        setError('quiz-detail', { type: 'custom', message: [value] });
                    }
                    delete quiz['detail']


                    for (let set_index in quiz['difficulty_sets']) {
                        let set_base = quiz_base + 'difficulty_sets.' + set_index;
                        let set = quiz['difficulty_sets'][set_index]

                        if (set['non_field_errors']) {
                            let value = set['non_field_errors'];
                            setError(set_base, { type: 'custom', message: value });
                        }
                        delete set['non_field_errors']

                        for (let question_index in set['questions']) {
                            let question_base = set_base + '.questions.' + question_index;
                            let question = set['questions'][question_index]

                            if (question['non_field_errors']) {
                                let value = question['non_field_errors'];
                                setError(question_base, { type: 'custom', message: value });
                            }
                            delete question['non_field_errors']

                            for (let answer_index in question['answers']) {
                                let answer_base = question_base + '.answers.' + answer_index;
                                let answer = question['answers'][answer_index]

                                if (answer['non_field_errors']) {
                                    let value = answer['non_field_errors'];
                                    setError(answer_base, { type: 'custom', message: value });
                                }
                                delete answer['non_field_errors']


                                for (let answer_key in answer) {
                                    let value = answer[answer_key];
                                    setError(answer_base + '.' + answer_key, { type: 'custom', message: value });
                                }
                            }
                            delete question['answers']

                            for (let question_key in question) {
                                let value = question[question_key];
                                setError(question_base + '.' + question_key, { type: 'custom', message: value });
                            }
                        }
                        delete set['questions']

                        for (let set_key in set) {
                            let value = set[set_key];
                            setError(set_base + '.' + set_key, { type: 'custom', message: value });
                        }
                    }
                    delete quiz['difficulty_sets']


                    for (let quiz_key in quiz) {
                        let value = quiz[quiz_key];
                        setError(quiz_key, { type: 'custom', message: value });
                    }
                }
                setIsLoading(false);
            })
    }

    const [isOwner, setIsOwner] = useState();

    useEffect(() => {
        checkIfOwner(courseId).then(
            (val) => {
                setIsOwner(val);
                setIsLoading(false);
            }
        )
    }, []);

    if (isCreationFinished) {
        return (
            <div className={`${styles['create-quiz-bg']} d-flex justify-content-center align-items-center`}>
                <h1>You have created the quiz successfully!</h1>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className={`${styles['create-quiz-bg']} d-flex justify-content-center align-items-center`}>
                <Spinner animation="border" variant="primary" style={{ width: "5.5rem", height: "5.5rem" }} />
            </div>
        )
    }

    if (isOwner !== 1) {
        return (
            <div className={`${styles['create-quiz-bg']} d-flex justify-content-center align-items-center`}>
                <div className={`${styles['quiz']} d-flex justify-content-center align-items-center flex-column`} style={{ textAlign: 'center', minHeight: '300px' }}>
                    <h1 style={{ textAlign: "center", fontSize: "52px", marginBottom: "40px" }}>Create New Quiz!</h1>
                    <h2 style={{ color: "red" }}>You don't have the permission to create quiz in this class!</h2>
                </div>
            </div>
        )
    }
    return (
        <div className={styles['create-quiz-bg']}>
            <div className={`${styles['quiz']}`}>
                <h1 style={{ textAlign: "center", fontSize: "52px", marginBottom: "40px" }}>Create New Quiz!</h1>
                <form

                    className={styles['quiz-form']}
                    onSubmit={handleSubmit((data) => {
                        data['classroom'] = courseId
                        setIsLoading(true);
                        createQuiz(data);
                    })}
                >
                    <div className="mb-5">
                        {errors?.[`quiz`]?.message?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}
                        {errors?.[`quiz-detail`]?.message?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}

                        <div className={`${errors['title'] && styles['input-error']}`}>
                            <label className={styles.label} htmlFor="title">Title</label>
                            <input className={styles['large-input']} type="text" id="title" {...register("title")} />
                            {errors['title'] && errors['title'].message.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
                        </div>

                        <div className={`${errors['description'] && styles['input-error']}`}>
                            <label className={styles.label} htmlFor="description">Description</label>
                            <input className={styles['large-input']} type="text" id="description" {...register("description")} />
                            {errors['description'] && errors['description'].message.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
                        </div>

                        <div className={`${errors['start_date'] && styles['input-error']}`}>
                            <label className={styles.label} htmlFor="date">Date and Time</label>
                            <input className={styles['large-input']} type="datetime-local" id="date" {...register("start_date")} />
                            {errors['start_date'] && errors['start_date'].message.map(err => <p key={err} className={styles['error-msg']}>Datetime has wrong format.</p>)}
                        </div>

                        <div className={`${errors['duration_in_minutes'] && styles['input-error']}`}>
                            <label className={styles.label} htmlFor="duration">Duration in minutes</label>
                            <input className={styles['mid-input']} type="number" min="1.0" id="duration" {...register("duration_in_minutes")} />
                            {errors['duration_in_minutes'] && errors['duration_in_minutes'].message.map(err => <p key={err} className={styles['error-msg']}>{err}</p>)}
                        </div>
                    </div>



                    <div>
                        <label className={styles.label}> Difficulty Sets </label>
                        <div className="d-flex flex-wrap">
                            {
                                fields.map((set, index) => {
                                    return (
                                        <RenderSet
                                            key={set.id}

                                            control={control}

                                            remove={remove}
                                            index={index}

                                            register={register}
                                            base_str={`difficulty_sets.${index}`}
                                            errors={errors?.[`difficulty_sets`]?.[index]}
                                            open={[openLast && index == fields.length - 1, setOpenLast]}
                                        />
                                    );
                                })
                            }
                            <button type="button" className={styles['append-set-btn']} onClick={() => { setOpenLast(true); append(); }}>
                                <img className={styles['plus-icon']} src={plus_icon} />
                                <div>Add new Set</div>
                            </button>
                        </div>
                    </div>


                    <button type="submit" className={styles['submit-quiz-btn']} onClick={() => {
                        clearErrors()
                    }}
                    >
                        Create quiz
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateQuiz;
