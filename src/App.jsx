import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import HomePage from './components/homepage/HomePage'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <NavBar></NavBar>

      <div className="App">
          <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </div>

    </>
  )
}

export default App
