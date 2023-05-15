import './App.css';
import { Routes, Route, createRoutesFromElements } from 'react-router-dom';
import {
  BrowserRouter,
  createBrowserRouter,
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

function App() {
  const BrowserRouter = createBrowserRouter([
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
          ],
        },
        // { path: '/messages', element: <Messages /> },
        // { path: '/calendar', element: <Calendar /> },
        // { path: '/profile', element: <Profile /> },
        // { path: '/logout', element: <Logout /> },
      ],
    },
  ]);
  const routerLogin = createBrowserRouter([
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

  // createRoutesFromElements(
  //   <Route index path='/' element={<HomePage />}/>
  //     <Route path='/login' element={<Login />} />
  //     <Route path='/register' element={<Register />} />
  //     <Route path='/activate-user-account'>
  //       <Route path=':uid/:token' element={<ActivateUserAccount />} />
  //     </Route>
  //     <Route path='/reset-password' element={<ResetPassword />} />
  //     <Route path='/confirm-password-reset'>
  //       <Route path=':uid/:token' element={<ConfirmResetPassword />} />
  //     </Route>
  // )

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
