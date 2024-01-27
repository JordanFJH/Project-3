import { Route, Routes } from 'react-router'
import GuestHomePage from './pages/GuestHomePage'
import SignInPage from './pages/SignInPage'
import UserHomePage from './pages/UserHomePage'
import SearchPage from './pages/SearchPage'
import UserMediaPage from './pages/UserMediaPage'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { useState } from 'react'

function App() {

  const [user, setUser] = useState({})

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<GuestHomePage />} />
        <Route path='/home' element={<UserHomePage user={user} setUser={setUser}/>} />
        <Route path='/login' element={<SignInPage user={user} setUser={setUser} />} />
        <Route path='/content' element={<UserMediaPage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
