import { useEffect, useState } from 'react';
import useInput from '../../../hooks/useInput';
import classes from './CoursesEnrollment.module.css';
import { enrollCourse } from '../../../utils/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const isNotEmpty = value => value.trim() !== '' && value.length === 7;

const CoursesEnrollment = () => {
  const navigate = useNavigate();

  const {
    value: enteredCourseCode,
    isValid: courseCodeIsValid,
    hasError: courseCodeHasError,
    valueChangeHandler: courseCodeChangeHandler,
    inputBlurHandler: courseCodeBlurHandler,
    reset: courseCodeReset,
  } = useInput(isNotEmpty);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (courseCodeIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [courseCodeIsValid]);

  const enrollCourseHandler = async event => {
    event.preventDefault();

    if (!courseCodeIsValid) {
      return;
    }

    try {
      const result = await enrollCourse(enteredCourseCode).then(response => {
        if (response.error === false) {
          toast.success(response.response.detail, { autoClose: 2000 });
          
          window.location.reload();
        } else {
          toast.error(response.response.detail, {});
          return response;
        }
      });

    } catch (err) {
      toast.error(err.response.detail, {});
    }

    courseCodeReset();
  };

  const courseCodeClasses = courseCodeHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <div className={classes.pageContainer}>
      <p className={classes.joinCodeInstructions}>
        To enroll in a course, you will need a{' '}
        <span className={classes.joinCodeLength}>7-character</span> join code
        that consists of both alphabets and numbers. This code can be obtained
        from your course instructor. Once you have the code, enter it into the
        field below and click the "Enroll" button to join the course.
      </p>

      <div className={classes.container}>
        <ToastContainer />
        <h1>Enroll Course</h1>
        <form onSubmit={enrollCourseHandler}>
          <div className={courseCodeClasses}>
            <label htmlFor='courseCode'>Course Join Code</label>
            <input
              type='text'
              id='courseCode'
              onChange={courseCodeChangeHandler}
              onBlur={courseCodeBlurHandler}
              value={enteredCourseCode}
            />
            {courseCodeHasError && (
              <p className={classes.error}>Please enter a valid course join code.</p>
            )}
          </div>
          <div className={classes.actions}>
            <button disabled={!formIsValid}>Enroll</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursesEnrollment;
