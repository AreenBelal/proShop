import React from 'react'
import { Logindiv } from '../../component/styled_component/div.style'
import LoginCard from '../../component/LoginCard'

const Login = () => {
   
    return (
      <Logindiv className='d-flex justify-content-center'>
     
      <LoginCard/>
  
      <img alt="LoginImg" src='/images/login.png' className='authImage' />
  
  
      </Logindiv>
    )
  }
  
  export default Login
  
