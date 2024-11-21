import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
let url = 'http://localhost:3000/login';

function Login() {
  let navigate = useNavigate();
  let [data,setData] = useState({
    email : '',
    password : '',
  })
  let handleChange = e => {
    let {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
    console.log(data);
  }
  let handleLogin = (e) => {
    e.preventDefault();
    let {email,password} = data;
    if(!email || !password){
      alert('data required');
    }
    else{
      axios.post(url,data)
      .then((res)=>{
        console.log(res)
        navigate('/');
        localStorage.setItem('token',res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

  }
  return (
    <>
    

<form 
onSubmit={handleLogin}
class="max-w-md mx-auto mt-20">
  <h1 className='text-3xl text-zinc-400 font-bold mb-2'>Login</h1>
  <div class="relative z-0 w-full mb-5 group">
      <input 
      onChange={handleChange}
      type="email" name="email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input
      onChange={handleChange}
      type="password" name="password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
</form>

    </>
  )
}

export default Login