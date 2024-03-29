import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage/HomePage';

import ActivateUserAccount from './pages/auth/ActivateUserAccount';
import ResetPassword from './pages/auth/ResetPassword';
import ConfirmResetPassword from './pages/auth/ConfirmResetPassword';

import Dashboard from './pages/Dashboard/Dashboard';
import Posts from './components/CourseDetails/CoursePosts/Posts/Posts';
import CourseInformation from './components/CourseDetails/CourseInformation/CourseInformation';
import CoursePage from './pages/CoursePage/CoursePage';
import RootLayout from './pages/RootLayout';
import { checkAuth } from './utils/auth';

import Calendar from './pages/calendar/Calendar';
import Messages from './pages/messages/Messages';

import CourseVideos from './components/CourseDetails/CourseVideos/CourseVideos';
import CourseFiles from './components/CourseDetails/CourseFiles/CourseFiles';

import Quizzes from './components/quiz/Quizzes/Quizzes';
import CreateQuiz from './components/quiz/CreateQuiz/CreateQuiz';
import TakeQuiz from './components/quiz/TakeQuiz/TakeQuiz';
import Meeting from './components/CourseDetails/VideoMeeting/Meeting';
import Room from './components/CourseDetails/VideoMeeting/Room';
import Profile from './pages/ProfilePage/Profile';
import QuizResult from './components/quiz/QuizResult/QuizResult';
import AllQuizResults from './components/quiz/AllQuizResults/AllQuizResults';
import CourseAssignment from './components/CourseDetails/CourseAssignment/CourseAssignment';

function App() {
  const BrowserRouter = createHashRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: ':courseId',
          id: 'course-detail',
          element: <CoursePage />,
          children: [
            {
              index: true,
              element: <CourseInformation />,
            },
            {
              path: 'posts',
              element: <Posts />,
            },
            {
              path: 'videos',
              element: <CourseVideos />,
            },
            {
              path: 'files',
              element: <CourseFiles />,
            },
            {
              path: 'quiz',
              element: <Quizzes />,
            },
            {
              path: 'meeting',
              element: <Meeting />,
            },
            {
              path: 'quiz/:quiz_model_id/result',
              element: <QuizResult />,
            },
            {
              path: 'quiz/:quiz_model_id/all-students-results',
              element: <AllQuizResults />,
            },
            {
              path: 'assignment',
              element: <CourseAssignment />,
            },
          ],
        },
                                         
        { path: '/messages', element: <Messages /> },
        { path: '/calendar', element: <Calendar /> },
        { path: 'profile', element: <Profile /> },
         // { path: '/logout', element: <Logout /> },
      ],
    },
    {
      path: ':courseId',
      children: [
        {
          path: 'quiz/create',
          element: <CreateQuiz />,
        },
        {
          path: 'quiz/:quiz_model_id/take',
          element: <TakeQuiz />,
        },
      ],
    },
    {
      path: 'room',
      element: <Room />,
    },
  ]);
  const routerLogin = createHashRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/activate-user-account',
      children: [
        {
          path: ':uid/:token',
          element: <ActivateUserAccount />,
        },
      ],
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/confirm-password-reset',
      children: [
        {
          path: ':uid/:token',
          element: <ConfirmResetPassword />,
        },
      ],
    },
  ]);

  const chooseRouter = () => {
    if (checkAuth() === true) return <RouterProvider router={BrowserRouter} />;
    else return <RouterProvider router={routerLogin} />;
  };

  return (
    <>
      <div className='App'>{chooseRouter()}</div>
    </>
  );
}
export default App;
