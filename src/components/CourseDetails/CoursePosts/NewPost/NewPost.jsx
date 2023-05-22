import classes from './NewPost.module.css';
import { useState, useEffect } from 'react';
import useInput from '../../../../hooks/useInput';
import { createPost } from '../../../../utils/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faSpinner,
  faTrash,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

const isNotEmpty = value => value.trim() !== '';
const isEmpty = value => value.trim().length >= 0;

const NewPost = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);

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
      const result = await createPost(
        props.courseId,
        enteredTitle,
        enteredDescription,
        files
      ).then(response => {
        if (response.error === false) {
          toast.success('Successfully Post Created', { autoClose: 2000 });
        } else {
          toast.error('Error: check your data', {});
          return response;
        }
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.detail, {});
    }

    resetTitle();
    resetDescription();
    setIsEditing(false);
    setFiles([]);
    setFilesUrl([]);

    props.refresh();
  };

  useEffect(() => {
    if (titleIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [titleIsValid]);

  const handleChange = event => {
    const newFiles = [...event.target.files];
    const newFilesUrl = [];
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const url = URL.createObjectURL(file);
      newFilesUrl.push(url);
    }
    setFiles([...files, ...event.target.files]);
    setFilesUrl([...filesUrl, ...newFilesUrl]);
  };

  const onCancel = () => {
    setIsEditing(false);
    setFiles([]);
    setFilesUrl([]);
    resetTitle();
    resetDescription();
  };

  const coursePostClasses = titleHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <>
      <ToastContainer />
      <div className={classes.newPost}>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>Add New Post</button>
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
                  <label htmlFor='files'>Files</label>
                  <input
                    id='files'
                    type='file'
                    multiple
                    onChange={handleChange}
                    className={classes.fileInput}
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

            {files && files.length > 0 && (
              <div className={classes.filesContainer}>
                {filesUrl.map((file, index) =>
                  files[index].type.startsWith('image/') ? (
                    <div className={classes.imageBox} key={index}>
                      <a href={file} target='_blank'>
                        <div className={classes.right}>
                          <img src={file} alt={file.name} />
                        </div>
                        <div>
                          <p>{files[index].name}</p>
                          <h6>image</h6>
                        </div>
                      </a>
                    </div>
                  ) : files[index].type.startsWith('video/') ? (
                    <div className={classes.videoBox} key={index}>
                      <a href={file} target='_blank'>
                        <div className={classes.right}>
                          <FontAwesomeIcon icon={faVideo} />
                        </div>
                        <div>
                          <p>{files[index].name}</p>
                          <h6>video</h6>
                        </div>
                      </a>
                    </div>
                  ) : (
                    <div className={classes.fileBox} key={index}>
                      <a href={file} target='_blank'>
                        <div className={classes.right}>
                          <FontAwesomeIcon icon={faFileAlt} />
                        </div>
                        <div>
                          <p>{files[index].name}</p>
                          <h6>file</h6>
                        </div>
                      </a>
                    </div>
                  )
                )}
              </div>
            )}

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
                Add Post
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default NewPost;
