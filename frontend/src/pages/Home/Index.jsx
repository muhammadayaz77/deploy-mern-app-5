import React from 'react'
import Login from './Home'
import {Route,Routes} from 'react-router-dom'
import Error from '../../components/Error'
import Home from './Home'
import About from './About'
import Profile from './Profile'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
let url = 'http://localhost:3000/profile';
function Index() {
  let navigate = useNavigate();
  let [data,setData] = useState(false);
  useEffect(()=>{
    let token = localStorage.getItem('token');
      axios.get(url,{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res);
        setData(true);
      })
      .catch((err)=>{
        navigate("/auth/login");
        console.log(err);
      });
  },[])
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