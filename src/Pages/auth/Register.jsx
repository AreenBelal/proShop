import React from 'react'
import RegisterCard from '../../component/RegisterCard'

const Register = () => {
    return (
      <div className='overflow-hidden'>
  
      <div className="row">
      
      <div className='col-md-4'>
      <RegisterCard/>

      </div>
   
      <div className="col-md-8 ms-auto">
        <img
          alt="registerImage"
          src='/images/register.png'
          style={{
            animation: 'slide-down 0.5s ease',
            marginTop: '20px',
            objectFit: 'fill',
            width: '100%'
          }}
        />
      </div>
    </div>
        
      </div>
    )
  }
  
  export default Register
  
