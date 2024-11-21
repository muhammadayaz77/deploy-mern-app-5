import React from 'react'
import Login from './Home'
import {Route,Routes} from 'react-router-dom'
import Error from '../../components/Error'
import Home from './Home'
import About from './About'
import Profile from './Profile'
function Index() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/*' element={<Error />} />
    </Routes>
    </>
  )
}

export default Index