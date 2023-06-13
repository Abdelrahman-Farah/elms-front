import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './QuizStyles.module.css';

import schedule from '/src/assets/quiz/quizzes/schedule.png'

import { Timer } from '../Timer';
import { deleteQuiz } from '../../../utils/getData';



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
    const navigate = useNavigate();

    let start_date = props.quiz['start_date'];
    let date = start_date.slice(0, start_date.indexOf("T"));
    let time = start_date.slice(start_date.indexOf("T") + 1);
    time = time.substr(0, 5);

    let duration = props.quiz['duration_in_minutes'];

    let end_date = new Date(new Date(start_date).getTime() + duration * 60000);

    let time_state = checkTime(start_date, end_date);
    let card_color = getCardColor(time_state);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleQuizDeletion = () => {
        setDeleteLoading(true);
        deleteQuiz(props['courseId'], props['quiz_model_id']).then((status) => {
            if (status == 204) {
                toast.success('Quiz has been deleted successfully!', { autoClose: 2500, position: toast.POSITION.BOTTOM_RIGHT });
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            }
            else {
                toast.error('Error has occured while deleting the quiz.', { autoClose: 4000, position: toast.POSITION.BOTTOM_RIGHT });
                setDeleteLoading(false);
            }
        })
    };

    return (
        <>
            <div
                className={styles['card']}
                style={{ border: `5px solid ${card_color}` }}
            >
                <ToastContainer />

                {
                    props.isOwner
                        ? (
                            <div className={styles['control-buttuns-div']}>
                                <Button
                                    variant="outline-danger"
                                    style={{ width: "44px", height: "44px", marginLeft: "auto", borderRadius: "50%", display: "flex" }}
                                    onClick={handleShow}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </Button>
                            </div>
                        )
                        : null
                }

                <div className={styles['inner-card']}>
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
                        <div
                            className={`${styles['quiz-state-inner']} ${!props.isOwner && time_state != 1 && styles['quiz-state-inner-2']}`}
                            onClick={() => {
                                if (!props.isOwner) {
                                    if (time_state == -1) {
                                        navigate(`${props.quiz['id']}/result`);
                                    }
                                    else if (time_state == 0) {
                                        return window.open(`${window.location.href}/${props.quiz['id']}/take`, "_blank")
                                    }
                                }

                            }}
                        >

                            <h3>Status</h3>
                            <h2 style={{ color: card_color, margin: "0" }}>
                                {time_state == -1 ? "Finished" : (time_state == 0 ? "on-going" : "Pending")}
                            </h2>
                            {
                                !props.isOwner && (
                                    <p style={{ color: "#d45753", fontSize: "17px", margin: "0" }}>
                                        {
                                            time_state == -1 ? "Click to see your result!" :
                                                time_state == 0 ? "Click now to take the quiz." : ""
                                        }
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    props.isOwner && time_state == -1
                        ? (
                            <>
                                <div className={styles['separator']}></div>

                                <div className={styles['all-students-results']}>
                                    <Button variant="outline-success" onClick={() => navigate(`${props.quiz['id']}/all-students-results`)}>
                                        <b>Show all students results</b>
                                    </Button>
                                </div>
                            </>
                        )
                        : null
                }
                {
                    time_state == 0
                        ? (
                            <>
                                <div className={styles['separator']} style={{ margin: "0 1em 0.8em 1em" }}></div>

                                <div style={{ color: card_color }}>
                                    <Timer expiryTimestamp={end_date} />
                                </div>
                            </>
                        )
                        : null
                }
            </div>

            <Modal show={showModal} onHide={handleClose} size="md" centered >
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the quiz "{props.quiz['title']}"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteLoading ? 21 : handleQuizDeletion}>
                        {deleteLoading ? <Spinner animation="border" variant="muted" /> : "Delete Quiz"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuizCard