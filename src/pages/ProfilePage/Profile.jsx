import { getUserData, updateUserData } from '../../utils/getData';
import classes from './Profile.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'react-hook-form';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({}); // [1
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      if (response.status === 200) {
        const userData = response.result;
        if (userData) {
          setUserData(userData);
          setUsername(userData.username);
          setEmail(userData.email);
          setProfilePicture(userData.profile_picture);
          setProfilePictureUrl(userData.profile_picture);
          setFirstName(userData.first_name);
          setLastName(userData.last_name);
        }
      } else {
        console.log('Error: ', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async() => {
    try {
      await updateUserData(
        firstName,
        lastName,
        profilePicture,
      ).then(response => {
        if (response.error === false) {
          toast.success('Successfully Course Updated', { autoClose: 2000 });
          window.location.reload();
        } else {
          toast.error('Error: check your data', {});
          return response;
        }
      });

    } catch (error) {
      toast.error('Error: check your data', {});
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfilePictureUrl(userData.profile_picture);
    setProfilePicture(userData.profile_picture);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
  };

  const handleAvatarChange = event => {
    if (event.target.files[0]) {
      setProfilePictureUrl(URL.createObjectURL(event.target.files[0]));
    }
    setProfilePicture(event.target.files[0]);
  };

  return (
    <div className={classes.Container}>
      <ToastContainer />
      <div className={classes.topDetail}>
        <div className={classes.username}>
          <h1>{username}</h1>
        </div>

        {!isEditing && (
          <button
            className={`${classes.updateButton} ${classes.btn}`}
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}

        {isEditing && (
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
          <img
            src={profilePictureUrl}
            alt='Course Avatar'
            className={classes.profilePicture}
          />
          {isEditing ? (
            <div className={classes.profilePictureEdit}>
              <label
                htmlFor='avatar-upload'
                className={classes.profilePictureButton}
              >
                <FontAwesomeIcon icon={faPlus} />
              </label>
              <input
                type='file'
                id='avatar-upload'
                className={classes.profilePictureInput}
                onChange={handleAvatarChange}
              />
            </div>
          ) : null}
        </div>
        <div className={classes.middle}>
          <div className={classes.email}>
            <h3>Email</h3>
            <p>{email}</p>
          </div>
          <div className={classes.firstName}>
            <h3>First Name:</h3>
            {isEditing ? (
              <input
                type='text'
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            ) : (
              <p>{firstName}</p>
            )}
          </div>
          <div className={classes.lastName}>
            <h3>Last Name:</h3>
            {isEditing ? (
              <input
                type='text'
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            ) : (
              <p>{lastName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
