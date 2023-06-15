import { useEffect, useState } from 'react';
import useInput from '../../../hooks/useInput';
import classes from './CourseCreation.module.css';
import { createCourse } from '../../../utils/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const isNotEmpty = value => value.trim() !== '';
const isEmpty = value => value.trim().length >= 0;

const CoursesCreation = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

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

  const formSubmitHandler = async event => {
    event.preventDefault();

    if (!titleIsValid) {
      return;
    }


    try {
      const result = await createCourse(
        enteredTitle,
        enteredDescription,
        avatar
      ).then(response => {
        if (response.error === false) {
          toast.success('Successfully Course Created', { autoClose: 2000 });
          setTimeout(() => {
            navigate(`/${response.response.id}`);
          }, 1000);
        } else {
          toast.error('Error: check your data', {});
          return response;
        }
      });
    } catch (err) {
      toast.error(err.response.detail, {});
    }

    resetTitle();
    resetDescription();
    setAvatar(null);
    setAvatarUrl(null);
  };

  useEffect(() => {
    
    if (titleIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [titleIsValid]);

  const avatarChangeHandler = event => {
    setAvatar(event.target.files[0]);
    if (event.target.files[0]) {
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  };


  const courseCodeClasses = titleHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <div className={classes.container}>
      <ToastContainer />
      <h1>Course Creation</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='avatar'>Avatar</label>
          <div className={classes.avatar}>
            <div
              className={classes.avatarImage}
              style={{
                backgroundImage: `url(${avatarUrl})`,
              }}
            >
              <div className={classes.avatarInput}>
                <label
                  htmlFor='avatar-upload'
                  className={classes.avatarLabel}
                  style={{
                    backgroundImage: `url(${avatarUrl})`,
                    opacity: avatarUrl !== null ? '0' : '1',
                  }}
                >
                  <span>Choose File</span>
                </label>
                <input
                  type='file'
                  id='avatar-upload'
                  accept='.jpg,.jpeg,.png'
                  onChange={avatarChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={courseCodeClasses}>
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
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            value={enteredDescription}
            rows='3'
          ></textarea>
        </div>
        <div className={classes.buttonContainer}>
          <button
            className={classes.submitButton}
            disabled={!formIsValid}
            type='submit'
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoursesCreation;
