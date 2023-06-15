import React, { useState } from 'react'
import { useFieldArray } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Alert from 'react-bootstrap/Alert';

import styles from "./CreateQuiz.module.css";

import RenderQuestion from './RenderQuestion';
const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">What is "mandatory set"?</Popover.Header>
        <Popover.Body>
            By checking the set as a <strong>mandatory set</strong>, All this set questions will be used for every student.
            <br/><br/>
            if you didn't check the set as a mandatory set, then you can specify how many questions from this set will be randomized.
        </Popover.Body>
    </Popover>
);

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function RenderSet(props) {
    const [show, setShow] = useState(props.open[0]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { fields, append, remove } = useFieldArray({
        name: `${props.base_str}.questions`,
        control: props.control,
    });

    if (props.open[0]){
        props.open[1](0)
    }

    return (
        <>
            <span className={props.errors && styles['set-btn-error']}>
                <button type="button" className={`col-2 ${styles['set-btn']}`} onClick={handleShow}> Set #{props.index + 1} </button>
            </span>

            <Modal show={show} onHide={handleClose} size="xl" centered >
                <Modal.Header closeButton>
                    <Modal.Title>Set #{props.index+1}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {props?.errors?.message?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}

                    <div className={styles.set}>

                        <div className="d-flex mb-4">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={popover}
                            >
                                {({ ref, ...triggerHandler }) => (
                                    <Button
                                        variant="light"
                                        {...triggerHandler}
                                        className="d-inline-flex align-items-center"
                                        ref={ref}
                                    >
                                        <div className={styles['mandatory-switch']}>
                                            <input className={styles['switch']} type="checkbox" id={`${props.base_str}.mandatory`} {...props.register(`${props.base_str}.is_mandatory`)} />
                                            <label className={styles['switch-label']} htmlFor={`${props.base_str}.mandatory`}></label>
                                            <label style={{fontWeight: "bold"}} htmlFor={`${props.base_str}.mandatory`}>Is this set is mandatory?</label>
                                        </div>

                                    </Button>
                                )}
                            </OverlayTrigger>



                            <div style={{ "marginLeft": "20%" }}>
                                <label style={{fontWeight: "bold"}} htmlFor={`${props.base_str}.used_questions`}>Number of used questions from this set: </label>
                                <select defaultValue={1} id={`${props.base_str}.used_questions`} {...props.register(`${props.base_str}.number_of_used_questions_from_this_set`)} required>
                                    {
                                        arrayRange(1, Math.max(1, fields.length), 1).map((val, index) => {
                                            return <option key={index} value={val} >{val}</option>
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <Accordion alwaysOpen>
                            {fields.map((question, index) => {
                                return <RenderQuestion
                                    key={question.id}

                                    control={props.control}

                                    remove={remove}
                                    index={index}
                                    unique_id={question.id}

                                    register={props.register}
                                    base_str={`${props.base_str}.questions.${index}`}
                                    errors={props?.errors?.[`questions`]?.[index]}
                                />
                            })}
                        </Accordion>
                        <button type="button" className={styles['append-question-btn']} onClick={() => { append() }}>Add Question</button>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.remove(props.index)}>
                        Delete set
                    </Button>

                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}

export default RenderSet