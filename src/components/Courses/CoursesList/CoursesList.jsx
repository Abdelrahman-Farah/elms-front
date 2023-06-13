import classes from './CoursesList.module.css';
import { useNavigate, Link } from 'react-router-dom';
import courseDefault from '../../../assets/courseDefault.jpg';


const CoursesList = props => {
  if (!props.courses || props.courses.length === 0) {
    return <h2>No courses found.</h2>;
  }

  const navigate = useNavigate();

  const courseClickedHandler = course => {
    navigate(`/${course?.id}`, { state: { id: course?.id, title: course?.title } });
  };

  return (
    <ul className={classes.container}>
      {props.courses.map(course => (
        <li
          key={course?.id}
          className={classes.courseCard}
          onClick={() => courseClickedHandler(course)}
        >
          <div className={classes.imageContainer}>
            <img
              src={course?.avatar ? course?.avatar : courseDefault}
              alt={course?.title}
              className={classes.image}
            />
          </div>
          <div className={classes.courseInfo}>
            <h2 className={classes.title}>Course: {course?.title}</h2>
            <div className={classes.ownerName}>
              Owner: {course?.owner?.username}
            </div>
            <div className={classes.joinCode}>
              Join Code: {course?.join_code}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CoursesList;
