/*Dependencies */
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import axios from '../../api/axios'

/*Styles */
import './Login.css'

/*Icons */
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";


export const Login = () => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [token, setToken] = useState("")
  const redirect = useNavigate();


  //UseEffect to validate if the token are empty and redirect to products
  useEffect(()=>{
    if (token !== "") {
      sessionStorage.setItem("accessToken",token);
      redirect("/products")
    }
    
  },[token])

  //handleSubmit to send user and password
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = { 'username': user, 'password': pwd };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/users/token',
    };

    await axios(options)
    .then( (response) => setToken(response.data.accessToken))
    .catch(error=>console.log(error));
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
          <div className="submit" onClick={handleSubmit}>Iniciar Sesion  &nbsp;<AiOutlineLogin />
          </div>
        </div>
    </div>
  )
}
