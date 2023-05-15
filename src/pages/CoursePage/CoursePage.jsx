import classes from './CoursePage.module.css';
import Card from '../../components/Ui/Card/Card';
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
    <Card className={classes.container}>
      <CoursesNavigator role={'enrolled'} courseTitle={title} />
      <Outlet />
    </Card>
  );
};

export default CoursePage;
