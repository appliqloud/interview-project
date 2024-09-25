import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
import './Login.css'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import qs from 'qs';


export const Login = () => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [token, setToken] = useState("")
  const redirect = useNavigate();

  useEffect(()=>{
    if (token !== "") {
      sessionStorage.setItem("accessToken",token);
      redirect("/products")
    }
    
  },[token])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = { 'username': user, 'password': pwd };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/users/token',
    };

    let login = await axios(options)
    .then( (response) => setToken(response.data.accessToken))
    .catch(error=>console.log(error));
    console.log(login);
  
    /*  */
  }

  return (
    <div className='container'>
        <div className="header">
          <div className="text">Sing Up</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <div id='img'><FaUserAlt /></div>
            <input type="email" placeholder='User' onChange={(e)=>setUser(e.target.value)}/>
          </div>
          <div className="input">
            <div id='img'><RiLockPasswordFill/></div>
            <input type="password" placeholder='Password' onChange={(e)=>setPwd(e.target.value)}/>
          </div>
        </div>

        <div className="submit-container">          
          <div className="submit" onClick={handleSubmit}>login</div>
        </div>
    </div>
  )
}
