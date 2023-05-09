import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import HomePage from './components/homepage/HomePage'

import ActivateUserAccount from './components/auth/ActivateUserAccount'
import ResetPassword from './components/auth/ResetPassword'
import ConfirmResetPassword from './components/auth/ConfirmResetPassword'

import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate-user-account">
            <Route path=":uid/:token" element={<ActivateUserAccount />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-password-reset">
            <Route path=":uid/:token" element={<ConfirmResetPassword />} />
          </Route>


          <Route path="/dashboard" element={<Dashboard />}>
          </Route>


        </Routes>
      </div>

    </>
  )
}

export default App
