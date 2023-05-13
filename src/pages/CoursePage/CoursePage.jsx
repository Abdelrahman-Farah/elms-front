import classes from './CoursePage.module.css';
import Card from '../../components/Ui/Card/Card';
import CoursesNavigator from '../../components/CoursesNavigator/CoursesNavigator';
import { useLocation } from 'react-router-dom';
import CourseInformation from '../../components/CourseDetails/CourseInformation/CourseInformation';

const CoursePage = () => {
  const location = useLocation();
  const course = location.state.course;
  return (
    <Card className={classes.container}>
      <CoursesNavigator role={'enrolled'} courseTitle={course.title} />
      <CourseInformation course={course} />
    </Card>
  );
};

export default CoursePage;
