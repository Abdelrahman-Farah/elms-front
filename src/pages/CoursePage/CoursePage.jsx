import classes from './CoursePage.module.css';
import CoursesNavigator from '../../components/CoursesNavigator/CoursesNavigator';
import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const CoursePage = () => {
  const location = useLocation();
  const title =
    location.state && location.state.title
      ? `Course: ${location.state.title}`
      : 'Your Course';

  return (
    <div className={classes.container}>
      <CoursesNavigator role={'enrolled'} courseTitle={title} />
      <Outlet />
    </div>
  );
};

export default CoursePage;
