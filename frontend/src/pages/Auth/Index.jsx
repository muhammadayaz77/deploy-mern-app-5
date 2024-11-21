import React from 'react'
import Login from './Login'
import {Route,Routes} from 'react-router-dom'
import Error from '../../components/Error'
import Register from './Register'
function Index() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/*' element={<Error />} />
    </Routes>
    </>
  )
}

export default Index