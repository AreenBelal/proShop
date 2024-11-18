import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../state/authenticationSlice';
import { ProfileContainer, StraightLine } from '../component/styled_component/div.style';

const UserProfile = () => {
    const {id} = useParams();
   
  const [userProfile, setProfile] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const getUser = async () => {
    try {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            console.error("Fetch error:", await res.json());  
        } else {
            const data = await res.json();
            setProfile(data);
        }
    } catch (error) {
        if (error.response) {
             console.error("Error fetching user data:", error.response.data);
        } else if (error.request) {
             console.error("Error fetching user data: No response received");
        } else {
            console.error("Error fetching user data:", error.message);
        }
    }
};

    
        useEffect(()=>{
            getUser();
        },[])

        let handleLogout = () =>{
         const token = localStorage.getItem('token')
          dispatch(logout({ user: userProfile, token }));
          navigate('/login')
        }

  return (
    
    <div className='container mt-5'>
    <div className='row gap-5 pt-5'>


      <ProfileContainer className='col-md-3 py-4'>


      <div className='text-center name'> Welcome {userProfile.name} !</div>

          <button className='profile_button'>My Orders</button>
          <Link style={{textDecoration:'none'}} to='/wishlist'> <button className='profile_button'>Wishlist</button> </Link>
          <button className='profile_button'> Notification </button>
          <button className='profile_button'>Settings</button>
          <StraightLine className='w-100'/>
          <button className='profile_button' onClick={handleLogout}>Logout</button>
        </ProfileContainer>

      <ProfileContainer className='col-md-7'>

      <div className='text-center name mt-5'>My profile</div>

            <div className='d-flex align-items-center'>
              <div className='dataProfile '> Name: </div>
              <div className='detailsProfile' > {userProfile.name} </div>
            </div>

            <div className='d-flex align-items-center'>
              <div className='dataProfile'>Email:</div>
              <div className='detailsProfile'> {userProfile.email}</div>
            </div>

            <label type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" className='mx-auto'>
              <div>Change password</div>
            </label>
         

        
      </ProfileContainer>
    </div>


   
  </div>
    
  )
}

export default UserProfile

