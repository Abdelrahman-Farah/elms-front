import classes from './CoursesNavigator.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';

const CoursesNavigator = props => {
  const changeEnrolledTabHandler = () => {
    props.onChangeTabHandler('enrolled');
  };

  const changeOwnedTabHandler = () => {
    props.onChangeTabHandler('owned');
  };

  const changeEnrollTabHandler = () => {
    props.onChangeTabHandler('enroll');
  };

  const changeCreateTabHandler = () => {
    props.onChangeTabHandler('create');
  };

  if (props.role === 'dashboard') {
    return (
      <nav className={classes.navbar}>
        <ul>
          <li>
            <div onClick={changeEnrolledTabHandler}>Enrolled Courses</div>
          </li>
          <li>
            <div onClick={changeOwnedTabHandler}>Owned Courses</div>
          </li>
          <li>
            <div onClick={changeEnrollTabHandler}>Enroll Course</div>
          </li>
          <li>
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
            <NavLink to='/'>Courses List</NavLink>
          </li>
          <li>
            <NavLink to={`/${courseId}`}>{props.courseTitle}</NavLink>
          </li>
          <li>
            <NavLink to='posts'>Posts</NavLink>
          </li>
          <li>
            <NavLink to='/'>Videos</NavLink>
          </li>
          <li>
            <NavLink to='/'>Files</NavLink>
          </li>
          <li>
            <NavLink to='quiz'>Quizzes</NavLink>
          </li>
          <li>
            <NavLink to='/'>Assignments</NavLink>
          </li>
          <li>
            <NavLink to='/'>Video Streaming</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default CoursesNavigator;
