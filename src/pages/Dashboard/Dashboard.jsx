import classes from './Dashboard.module.css';
import CoursesNavigator from '../../components/CoursesNavigator/CoursesNavigator';
import { useEffect, useState } from 'react';
import { getCourses } from '../../utils/getData';
import CoursesList from '../../components/Courses/CoursesList/CoursesList';
import CoursesEnrollment from '../../components/Courses/CoursesEnrollment/CoursesEnrollment';
import CoursesCreation from '../../components/Courses/CourseCreation/CourseCreation';

const Dashboard = () => {
  const [ownedCourse, setOwnedCourse] = useState(null);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('enrolled');
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCoursesData = async () => {
    setLoading(true);
    try {
      getCourses().then(data => {
        setLoading(false);
        if (data.status === 200) {
          setEnrolledCourse(data.result.learner_courses);
          setOwnedCourse(data.result.owner_courses);
          return;
        } else {
          setError(true);
          return;
        }
      });
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const changeTabHandler = tab => {
    setActiveTab(tab);
  };

  return (
    <div className={classes.container}>
      <CoursesNavigator onChangeTabHandler={changeTabHandler} role={'dashboard'} />
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {!isLoading &&
        !error &&
        (activeTab === 'enrolled' || activeTab === 'owned') && (
          <CoursesList
            courses={activeTab === 'enrolled' ? enrolledCourse : ownedCourse}
          />
        )}
      {!isLoading && !error && activeTab === 'enroll' && <CoursesEnrollment />}
      {!isLoading && !error && activeTab === 'create' && <CoursesCreation />}
    </div>
  );
};

export default Dashboard;
