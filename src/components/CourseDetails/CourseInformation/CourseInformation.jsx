import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CourseInformation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCourse, deleteCourse } from '../../../utils/getData';
import { set } from 'react-hook-form';

const CourseInformation = props => {
  const isOwner = props.course.isOwner;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.course.title);
  const [newDescription, setNewDescription] = useState(
    props.course.description
  );
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(props.course.avatar);

  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateCourse(
        props.course.id,
        newTitle,
        newDescription,
        newAvatar
      ).then(response => {
        console.log(response);
        if (response.error === false) {
          toast.success('Successfully Course Updated', { autoClose: 2000 });
        } else {
          toast.error('Error: check your data', {});
          return response;
        }
      });
    } catch (err) {
      toast.error('Error: check your data', {});
    }

    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCourse(props.course.id);
      if (response.status === 204) {
        toast.success('Successfully Course Deleted', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error('Error: check your data', {});
      }
    } catch (err) {
      toast.error('Error: 1check your data', {});
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(props.course.title);
    setNewDescription(props.course.description);
    setNewAvatar(props.course.avatar);
    setAvatarUrl(props.course.avatar);
  };

  const handleAvatarChange = event => {
    if (event.target.files[0]) {
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
    setNewAvatar(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <div className={classes.Container}>
      <ToastContainer />
      <div className={classes.topDetail}>
        <div className={classes.title}>
          {isEditing ? (
            <input
              className={classes.titleInput}
              type='text'
              onChange={event => setNewTitle(event.target.value)}
              value={newTitle}
            />
          ) : (
            <h1 className={newTitle}>{newTitle}</h1>
          )}
        </div>
        <button
          className={`${classes.cancelButton} ${classes.btn} ${classes.deleteButton}`}
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTimes} /> {isOwner ? 'Delete' : 'Leave'}
        </button>

        {isOwner && !isEditing && (
          <button
            className={`${classes.updateButton} ${classes.btn}`}
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}

        {isOwner && isEditing && (
          <div className={classes.editActions}>
            <button
              className={`${classes.saveButton} ${classes.btn}`}
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
            <button
              className={`${classes.cancelButton} ${classes.btn}`}
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className={classes.downDetail}>
        <div className={classes.left}>
          <img src={avatarUrl} alt='Course Avatar' className={classes.avatar} />
          {isEditing ? (
            <div className={classes.avatarEdit}>
              <label htmlFor='avatar-upload' className={classes.avatarButton}>
                <FontAwesomeIcon icon={faPlus} />
              </label>
              <input
                type='file'
                id='avatar-upload'
                className={classes.avatarInput}
                onChange={handleAvatarChange}
              />
            </div>
          ) : null}
        </div>

        <div className={classes.middle}>
          <div className={classes.owner}>
            <div>
              <span>{isOwner ? 'You are the owner ' : 'Owner: '}</span>
              <span>{props.course.owner.username}</span>
            </div>
            <div>
              <span>{isOwner ? 'Your email: ' : 'Owner email: '}</span>
              <span>{props.course.owner.email}</span>
            </div>
          </div>

          <div className={classes.joinCode}>
            <span>Course Join Code: </span>
            <span>{props.course.join_code}</span>
          </div>

          <div className={classes.creationTime}>
            <span>Created at: </span>
            <span className={classes.date}>
              {new Date(props.course.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        <div className={classes.right}>
          <div className={classes.description}>
            <span>Description</span>
            {isEditing ? (
              <textarea
                className={classes.descriptionInput}
                onChange={event => setNewDescription(event.target.value)}
                value={newDescription}
              />
            ) : (
              <p>{newDescription}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
