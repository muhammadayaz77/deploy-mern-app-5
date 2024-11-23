import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
let url = 'http://localhost:3000'

function Home() {
  let [data,setData] = useState([ ]);
  let [user,setUser] = useState('');
  let [loading,setLoading] = useState(false);
  let fetchedData = () => {
    setLoading(false);
    let token = localStorage.getItem('token');
      axios.get(`${url}/userProfile`,{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setData(res.data.posts);
        setUser(res.data)
        setLoading(true);
      })
      .catch((err)=>{
        navigate("/auth/login");
        console.log(err);
      });
  }
  useEffect(()=>{
   fetchedData();
  },[])
  return (
    <>
   {/* Show Data Here */}
   <Link to='/' className='text-red-500 ml-20 mt-10 text-xl inline-block'>Back</Link>
    <h1 className='ml-20 mt-10 text-2xl font-bold'><span className='text-zinc-600'>Wellcome, </span> <span>{user.name}👋</span></h1>
    <h1 className='ml-20 mt-10 text-xl font-semibold text-zinc-600'>Your posts here.</h1>
    {
      data.map(item => (
        <div className='ml-20 bg-zinc-200 w-[30%] p-3 mt-3 rounded-sm'>
        <p className='text-blue-700'>@async</p>
        <p className='text-sm tracking-tight my-3'>{item.content}</p>
        <p className='text-[14px]'><span className='text-blue-500'>Like</span> <span className='text-zinc-500'>Edit</span></p>
      </div>
      ))
    }
    </>
  )
}

export default Home