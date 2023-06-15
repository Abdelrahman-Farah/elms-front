import React, { useState, useEffect, useRef } from 'react';
import classes from './UpperNavigator.module.css';
import logo from '../../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { searchCourse, getUserData } from '../../utils/getData';
import { useNavigate } from 'react-router-dom';

const UpperNavigator = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState({});
  const resultsListRef = useRef();

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        resultsListRef.current &&
        !resultsListRef.current.contains(event.target)
      ) {
        setCourses([]);
        setInput('');
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      if (response.status === 200) {
        const userData = response.result;
        if (userData) {
          setUserData(userData);
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

  const fetchCoursesData = async searchValue => {
    try {
      const response = await searchCourse(searchValue);
      if (response.status === 200) {
        const ownerCoursesData = response.result.owner_courses || [];
        const learnerCoursesData = response.result.learner_courses || [];
        const coursesData = [
          ...ownerCoursesData.map(course => ({
            id: course?.id,
            title: course?.title,
          })),
          ...learnerCoursesData.map(course => ({
            id: course?.id,
            title: course?.title,
          })),
        ];
        setCourses(coursesData);
      } else {
        console.log('Error: ', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const courseSearchHandler = event => {
    setInput(event.target.value);
    if (event.target.value.trim() === '') {
      setCourses([]);
      return;
    }
    fetchCoursesData(event.target.value);
  };

  return (
    <nav className={classes.upperNavigator}>
      <div className={classes.left}>
        <div className={classes.logo} onClick={() => navigate('/')}>
          <img src={logo} alt='logo' className={classes.logoImage} />
          <h1 className={classes.siteName}>ELMS</h1>
        </div>
        <div className={classes.searchBarContainer}>
          <div className={classes.searchBar}>
            <div className={classes.searchContainer}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={classes.searchIcon}
              />
              <input
                type='text'
                placeholder='Find your course...'
                className={classes.searchInput}
                onChange={courseSearchHandler}
                value={input}
              />
            </div>
            <button className={classes.searchButton}>Search</button>
          </div>
          {courses && courses.length > 0 && (
            <div className={classes.resultsList} ref={resultsListRef}>
              {courses.map((result, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setCourses([]);
                      setInput('');
                      navigate(`${result.id}`);
                    }}
                    className={classes.searchResult}
                  >
                    <div className={classes.resultTitle}>{result.title}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.user} onClick={() => navigate('profile')}>
          <div className={classes.userName}>
            <h1>{userData.username}</h1>
          </div>
          <div className={classes.userImage}>
            <img src={userData.profile_picture} alt='user' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UpperNavigator;
