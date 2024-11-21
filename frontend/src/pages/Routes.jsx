import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Auth from './Auth/Index'
import Error from '../components/Error'
import Home from './Home/Index'
function Index() {
  return (
    <>
    <Routes>
      <Route path='/auth/*' element={<Auth />} />
      <Route path='/*' element={<Home />} />
    </Routes>
    </>
  )
}

export default Index