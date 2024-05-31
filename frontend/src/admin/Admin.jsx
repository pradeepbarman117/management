import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from './components/common/header/Header'
import DailyUpdates from './components/common/dailyupdates/DailyUpdates'
import DailyProjectStatus from './pages/dailyprojectstatus/DailyProjectStatus'



const Admin = () => {

  const [auth , setAuth] = useState(false)
  const [message,setMessage] = useState('')
  const [name , setName]=useState()
  const [email , setEmail]=useState()
  // axios.defaults.withCredentials = true

  // useEffect(()=>{
  //   axios.get("http://localhost:3000")
  //   .then(res =>{
  //     if(res.data.Status === "Success"){
  //         setAuth(true)
  //         setName(res.data.name)
  //         setEmail(res.data.email)
  //     }
  //     else{
  //         setAuth(false)
  //         setMessage(res.data.Error)
  //     }
  //   })
  //   .then(err =>console.log(err))
  // })
  let tks = localStorage.getItem('token');
  setTimeout(()=>{
    (tks.length > 0)? setAuth(true): setAuth(false)
  },10)
 

  


  return (
    <>
       
      {
        auth ?
        <div>
        <Header/>
        <DailyUpdates/>
        <DailyProjectStatus/>
        </div>
        :
        <div className='beforelog'>
        <h1>You are not an authorised user</h1>
        <Link to={'/admin'} className='logbtn'>Login Now</Link>
        </div>
     
    }
    </>
  )
};

export default Admin