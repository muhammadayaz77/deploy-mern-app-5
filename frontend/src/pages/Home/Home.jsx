import React from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
let url = 'http://localhost:3000/profile'

function Home() {
  let [user,setUser] = useState({});
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
        setUser(res.data);
        setData(true);
      })
      .catch((err)=>{
        navigate("/auth/login");
        console.log(err);
      });
  },[])
  return (
    <>
   <Navbar></Navbar>
   <h1 className='text-2xl font-bold ml-20 mt-20'><span className='text-zinc-500'>Welcome, </span>{user.name}👋</h1>
   <p className='ml-20'>{user.email}</p>
    </>
  )
}

export default Home