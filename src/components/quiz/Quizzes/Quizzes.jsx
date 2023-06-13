import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import styles from './QuizStyles.module.css';

import { checkIfOwner, getQuizzes } from '../../../utils/getData';

import QuizCard from './QuizCard';
function Quizzes() {
    const { courseId } = useParams();

    const [isOwner, setIsOwner] = useState(0);
    const [isLoading, setIsLoadnig] = useState(true);
    const [error, setError] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        checkIfOwner(courseId).then((val) => {
            setIsOwner(val);
            setIsLoadnig(false);
        })

        getQuizzes(courseId).then((data) => {
            if (data['status'] == 200) {
                data['result'].sort(function compare(a, b) {
                    var dateA = new Date(a.start_date);
                    var dateB = new Date(b.start_date);
                    return dateA - dateB;
                });
                setQuizzes(data['result']);
            }
            else {
                setError(data['result']['detail']);
            }
        })
    }, []);

    if (isLoading) {
        return (
            <div className={`${styles['quizzes-bg']} d-flex justify-content-center align-items-center`}>
                <Spinner animation="border" variant="primary" style={{ width: "5.5rem", height: "5.5rem" }} />
            </div>
        )
    }

    return (
        <div className={styles['quizzes-bg']}>
            {
                isOwner
                    ? (
                        <div className={styles['new-quiz']}>
                            <button type='button' onClick={() => window.open(`${window.location.href}/create`, "_blank")}>Create New Quiz</button>
                        </div>
                    )
                    : null
            }

            {error ? <Alert variant='danger'> {error} </Alert> : null}

            <div className={styles['quizzes']}>
                {
                    quizzes.length == 0
                        ? <div className='mt-5'>
                            <Alert>There are no Quizzes in this course!</Alert>
                        </div>

                        : quizzes.map((quiz, index) => {
                            return (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    isOwner={isOwner}
                                    courseId={courseId}
                                    quiz_model_id={quiz['id']}
                                />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Quizzes