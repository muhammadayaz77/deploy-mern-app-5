import React, { useRef } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
let url = 'http://localhost:3000'

function Home() {
  let [id,setId] = useState('');
  let content = useRef();
  let [data,setData] = useState([ ]);
  let navigate = useNavigate();
  let [loading,setLoading] = useState(false);
  let fetchedData = () => {
    setLoading(false);
    let token = localStorage.getItem('token');
      axios.get(`${url}/profile`,{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then((res)=>{  
        setData(res.data.post);
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
  const handleCreateBtn = async (e) => {
    e.preventDefault(); // Prevent form refresh
    const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
  
    if (!token) {
        console.log('User is not authenticated. Please log in.');
        return;
    }
  
    try {
        const response = await axios.post(
            `${url}/userPost`, // Your Express route URL
            { 
              content : content.current.value
  
             }, // Data sent in the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            }
        );
        console.log(response.data); // Handle the response message
    } catch (error) {
        // Handle errors (e.g., network, validation, server errors)
        console.log(
            error.response?.data?.message || 'An error occurred while creating the post.'
        );
    }
    fetchedData();
    content.current.value = "";
  };
  let handleLikeBtn = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
  
    if (!token) {
        console.log('User is not authenticated. Please log in.');
        return;
    }
  
    try {
        const response = await axios.get(
            `${url}/likes/${id}`, // Your Express route URL
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            }
        );
        console.log(response.data._id); // Handle the response message
        setId(response.data._id); // Handle the response message
    } catch (error) {
        // Handle errors (e.g., network, validation, server errors)
        console.log(
            error.response?.data?.message || 'An error occurred while creating the post.'
        );
    }
    fetchedData();
  }
  return (
    <>
   <Navbar></Navbar>
   {/* ADD Content Here */}
   
  <div className='ml-20 mt-5'>
  <h2 className='text-sm mb-3 text-zinc-500'>You can create a new post.</h2>
        <form
        onSubmit={handleCreateBtn}
        action="">
        <textarea 
        ref={content}
        className='block bg-transparent border-[1px] border-zinc-600 text-sm w-[30%] p-2 my-3'
        name="content" id="" placeholder="What's on your mind ?"></textarea>
        <button type="submit" className='bg-blue-500 p-2 rounded-md'>Create New Post</button>
        </form>
  </div>
   {/* Show Data Here */}
    <h1 className='ml-20 mt-10 text-xl font-semibold text-zinc-600'>All Posts Here.</h1>
    {
      data.map(item => (
        <div className='ml-20 bg-zinc-200 w-[30%] p-3 mt-3 rounded-sm'>
        <p className='text-blue-700'>@async</p>
        <p className='text-sm tracking-tight mt-3'>{item.content}</p>
        <small className='text-[11px]'>{item.likes.length} Likes</small>
        <p className='text-[14px]'><span onClick={()=>{handleLikeBtn(item._id)}} className='text-blue-700 cursor-pointer'>Like</span> <span className='text-zinc-500'>Edit</span></p>
      </div>
      ))
    }
    </>
  )
}

export default Home