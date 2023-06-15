import { useState, useEffect, useRef } from 'react';
import classes from './Meeting.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import meetPeople from '../../../assets/meetPeople.jpg';
import useInput from '../../../hooks/useInput';
import { Link, useParams } from 'react-router-dom';
import { checkIfOwner, sendMeetingLink } from '../../../utils/getData';

const isNotEmpty = value => value.trim() !== '' && value.length === 4;
const linkIsNotEmpty = value => value.trim() !== '';

const Meeting = () => {
  const { courseId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const startDateTimeRef = useRef(null);
  const endDateTimeRef = useRef(null);

  const {
    value: enteredMeetingLink,
    isValid: meetingLinkIsValid,
    hasError: meetingLinkHasError,
    valueChangeHandler: meetingLinkChangeHandler,
    inputBlurHandler: meetingLinkBlurHandler,
    reset: meetingLinkReset,
  } = useInput(linkIsNotEmpty);

  const {
    value: enteredMeetingCode,
    isValid: meetingCodeIsValid,
    hasError: meetingCodeHasError,
    valueChangeHandler: meetingCodeChangeHandler,
    inputBlurHandler: meetingCodeBlurHandler,
    reset: meetingCodeReset,
  } = useInput(isNotEmpty);

  const roomCodeHandler = async event => {
    event.preventDefault();
    if (!meetingCodeIsValid) {
      return;
    }
    window.open(
      `https://mazen-barakat.github.io/video/WEB_UIKITS.html?roomID=${enteredMeetingCode}`,
      '_blank'
    );
    meetingCodeReset();
  };

  const meetingLinkHandler = async event => {
    event.preventDefault();
    if (!meetingLinkIsValid) {
      return;
    }
    const startDateTime = startDateTimeRef.current.value;
    const endDateTime = endDateTimeRef.current.value;

    try {
      const result = await sendMeetingLink(
        courseId,
        enteredMeetingLink,
        startDateTime,
        endDateTime
      ).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }

    meetingLinkReset();
  };

  useEffect(() => {
    const checkIfOwnerHandler = async () => {
      const result = await checkIfOwner(courseId);
      setIsOwner(result);
    };
    checkIfOwnerHandler();
  }, [courseId]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDateTime = new Date(now - offset).toISOString().slice(0, 16);
    return localDateTime; // Format: YYYY-MM-DDTHH:mm
  };

  const getOneHourAheadDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDateTime = new Date(now - offset + 3600000)
      .toISOString()
      .slice(0, 16);
    return localDateTime; // Format: YYYY-MM-DDTHH:mm
  };

  return (
    <div className={classes.container}>
      <div className={classes.meetingDetails}>
        <h1 className={classes.description}>
          High-quality video Meeting. Available for everyone, for free.
        </h1>

        <div className={classes.meetingCreateOrJoin}>
          <div style={{ padding: 0 }}>
            <Link
              to='https://mazen-barakat.github.io/video/WEB_UIKITS.html'
              target='_blank'
            >
              <button className={classes.meetingCreate}>
                <FontAwesomeIcon
                  className={classes.materialIcons}
                  icon={faVideo}
                />
                {'  '}
                New Meeting
              </button>
            </Link>
          </div>
          <div className={classes.meetingJoin}>
            <button className={classes.meetingJoinButton}>
              <FontAwesomeIcon icon={faKeyboard} />
              {'  '}
              <input
                type='text'
                placeholder='Enter a code'
                onChange={meetingCodeChangeHandler}
                onBlur={meetingCodeBlurHandler}
                value={enteredMeetingCode}
                className={classes.inputField}
              />
            </button>
            {meetingCodeHasError && (
              <p className={classes.error}>Please enter a valid code.</p>
            )}
          </div>
          <div onClick={roomCodeHandler} className={classes.join}>
            Join
          </div>
        </div>

        {isOwner ? (
          <div className={classes.box}>
            <p className={classes.info}>
              Send a link to invite Course Subscribers to your meeting. They can
              join by clicking the link.
            </p>
            <div className={classes.inputContainer}>
              <input
                type='text'
                className={classes.linkInput}
                placeholder='Enter Meeting link'
                onChange={meetingLinkChangeHandler}
                onBlur={meetingLinkBlurHandler}
                value={enteredMeetingLink}
              />
              {meetingLinkHasError && (
                <p className={classes.error}>Please enter a valid link.</p>
              )}
              <div className={classes.datetimeContainer}>
                <input
                  type='datetime-local'
                  className={classes.datetimeInput}
                  defaultValue={getCurrentDateTime()}
                  ref={startDateTimeRef}
                />
                <input
                  type='datetime-local'
                  className={classes.datetimeInput}
                  defaultValue={getOneHourAheadDateTime()}
                  ref={endDateTimeRef}
                />
              </div>
            </div>
            <button
              disabled={!meetingLinkIsValid}
              className={classes.button}
              onClick={meetingLinkHandler}
            >
              Send Meeting Link
            </button>
          </div>
        ) : null}
      </div>

      <div className={classes.ImageContainer}>
        <img
          src={meetPeople}
          alt='meet-people'
          className={classes.meetingImage}
        />
      </div>
    </div>
  );
};

export default Meeting;
