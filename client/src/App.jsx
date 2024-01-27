import { Route, Routes, Navigate } from 'react-router-dom'
import GuestHomePage from './pages/GuestHomePage'
import SignInPage from './pages/SignInPage'
import UserHomePage from './pages/UserHomePage'
import SearchPage from './pages/SearchPage'
import UserMediaPage from './pages/UserMediaPage'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [user, setUser] = useState({})

  async function getUser(token) {
    try {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: token
        }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
      //localStorage.removeItem("token")
    }
    //setIsLoading(false);
  }

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {
      // Get user info
      getUser(token)
    } else {
      //setIsLoading(false)
    }

  }, [])

  // const [loginStatus, setLoginStatus] = useState(false)
  let loggedIn = false
  const activeToken = localStorage.getItem("token")
  activeToken?.length > 0 ? loggedIn = true : loggedIn = false

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        {loggedIn ?
          <>
            <Route path='/home' element={<UserHomePage user={user} setUser={setUser} />} />
            <Route path='/content' element={<UserMediaPage user={user} setUser={setUser}/>} />
            <Route path='/search' element={<SearchPage user={user} setUser={setUser}/>} />
            <Route path='*' element={<Navigate to="/home" />} />
          </>
          :
          <>
            <Route path='/' element={<GuestHomePage />} />
            <Route path='/login' element={<SignInPage user={user} setUser={setUser} />} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
        }
      </Routes>
      <Footer />
    </>
  )
}

export default App
