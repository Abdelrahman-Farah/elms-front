import classes from './CoursesNavigator.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';

const CoursesNavigator = props => {
  const [activeTab, setActiveTab] = useState('enrolled');

  const changeEnrolledTabHandler = () => {
    props.onChangeTabHandler('enrolled');
    setActiveTab('enrolled');
  };

  const changeOwnedTabHandler = () => {
    props.onChangeTabHandler('owned');
    setActiveTab('owned');
  };

  const changeEnrollTabHandler = () => {
    props.onChangeTabHandler('enroll');
    setActiveTab('enroll');
  };

  const changeCreateTabHandler = () => {
    props.onChangeTabHandler('create');
    setActiveTab('create');
  };

  if (props.role === 'dashboard') {
    return (
      <nav className={classes.navbar}>
        <ul>
          <li className={activeTab === 'enrolled' ? classes.active : ''}>
            <div onClick={changeEnrolledTabHandler}>Enrolled Courses</div>
          </li>
          <li className={activeTab === 'owned' ? classes.active : ''}>
            <div onClick={changeOwnedTabHandler}>Owned Courses</div>
          </li>
          <li className={activeTab === 'enroll' ? classes.active : ''}>
            <div onClick={changeEnrollTabHandler}>Enroll Course</div>
          </li>
          <li className={activeTab === 'create' ? classes.active : ''}>
            <div onClick={changeCreateTabHandler}>Create Course</div>
          </li>
        </ul>
      </nav>
    );
  } else if (props.role === 'enrolled') {
    const { courseId } = useParams();
    return (
      <nav className={classes.navbar}>
        <ul>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Courses List
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${courseId}`}
              className={({ isActive }) => (isActive ? classes.active : null)}
              end
            >
              {props.courseTitle}
            </NavLink>
          </li>
          <li>
            <NavLink
              to='posts'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to='videos'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to='files'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Files
            </NavLink>
          </li>
          <li>
            <NavLink
              to='quiz'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink
              to='assignment'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Assignments
            </NavLink>
          </li>
          <li>
            <NavLink
              to='meeting'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Video Meeting
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default CoursesNavigator;
