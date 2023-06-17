import classes from './NewAssignment.module.css';
import { useState, useEffect } from 'react';
import useInput from '../../../../hooks/useInput';
import { createCourseAssignment } from '../../../../utils/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faSpinner,
  faTrash,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { set } from 'react-hook-form';

const isNotEmpty = value => value.trim() !== '';
const isEmpty = value => value.trim().length >= 0;
const isNumber = value => value.trim().length > 0;
const isDate = value => value.trim().length > 0;

const NewAssignment = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [file, setFile] = useState(null);

  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: enteredDescription,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isEmpty);

  const {
    value: degree,
    isValid: degreeIsValid,
    valueChangeHandler: degreeChangeHandler,
    inputBlurHandler: degreeBlurHandler,
    reset: resetDegree,
  } = useInput(isNumber);

  const {
    value: dueDate,
    isValid: dueDateIsValid,
    valueChangeHandler: dueDateChangeHandler,
    inputBlurHandler: dueDateBlurHandler,
    reset: resetDueDate,
  } = useInput(isDate);

  const formSubmitHandler = async event => {
    event.preventDefault();

    if (!titleIsValid || !degreeIsValid || !dueDateIsValid) {
      return;
    }

    try {
      const response = await createCourseAssignment(
        props.courseId,
        enteredTitle,
        enteredDescription,
        dueDate,
        degree,
        file
      ).then(res => {
        console.log(res);
        if (res.error === false) {
          toast.success('Assignment created successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error('Something went wrong', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    resetTitle();
    resetDescription();
    setIsEditing(false);
    setFile(null);
    resetDegree();
    resetDueDate();

    props.refresh();
  };

  useEffect(() => {
    if (titleIsValid && degreeIsValid && dueDateIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [titleIsValid, degreeIsValid, dueDateIsValid]);

  const handleChange = event => {
    setFile(event.target.files[0]);
  };

  const onCancel = () => {
    setIsEditing(false);
    setFile(null);
    resetTitle();
    resetDescription();
    resetDegree();
    resetDueDate();
  };


  const coursePostClasses = titleHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <>
      <ToastContainer />
      <div className={classes.newPost}>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>Add New Assignment</button>
        )}
        {isEditing && (
          <form onSubmit={formSubmitHandler}>
            <div className={classes.top}>
              <div className={classes.controls}>
                <div className={coursePostClasses}>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    id='title'
                    onChange={titleChangeHandler}
                    onBlur={titleBlurHandler}
                    value={enteredTitle}
                  />
                  {titleHasError && (
                    <p className={classes.error}>Please enter a valid title.</p>
                  )}
                </div>
                <div className={classes.control}>
                  <label htmlFor='files'>File</label>
                  <input
                    id='files'
                    type='file'
                    onChange={handleChange}
                    className={classes.fileInput}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor='degree'>degree</label>
                  <input
                    type='number'
                    id='degree'
                    onChange={degreeChangeHandler}
                    onBlur={degreeBlurHandler}
                    value={degree}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor='dueDate'>Due Date</label>
                  <input
                    type='dateTime-local'
                    id='dueDate'
                    onChange={dueDateChangeHandler}
                    onBlur={dueDateBlurHandler}
                    value={dueDate}
                  />
                </div>
              </div>
            </div>

            <div className={classes.bottom}>
              <div className={classes.control}>
                <label htmlFor='content'>Content</label>
                <textarea
                  id='content'
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                  value={enteredDescription}
                ></textarea>
              </div>
            </div>

            <div className={classes.actions}>
              <button
                className={classes.cancelButton}
                type='button'
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type='submit'
                className={classes.submitButton}
                disabled={!formIsValid}
              >
                Add Assignment
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default NewAssignment;
