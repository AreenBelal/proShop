import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {validatePassword} from '../common/function/validationUtils'
import { ProfileButton, Savechanges } from '../common/styled_comp/Button.style';
import { DataProfile, DetailsProfile, LabelAuth, NameProfile, ProfileContainer, StraightLine } from '../common/styled_comp/divStyles.style';
import { InputAuth, ProfileLabel } from '../common/styled_comp/Input.style';


function Userprofile({ handleLogout }) {
  const { id } = useParams();
 
  const [userProfile, setProfile] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const [existpassword, setExistPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const [error, setError] = useState("");
   
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('/images/noImage.png');
  const navigate = useNavigate();

  
  const handlePasswordChange = (value) => {
    setNewPassword(value);

    if (validatePassword(value)) {
      setPasswordValid(true);
      setError(""); 
    } else {
      setPasswordValid(false);
      setError("Password must be strong");
      return;
    }
  };

 
  const getUser = async () => {
    try {
      let res = await axios.get('/users.json');
      let user = res.data.users.find(user => user.id === parseInt(id));
      if (user) {
        setProfile(user);
        setExistPassword(user.password);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Error");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();  
      
    try {

      if (existpassword !== oldpassword || !existpassword || !oldpassword) {
        setError("Please check old password or check if fields are empty");
        return;
      }
  
       if (newpassword !== confirmPassword || !newpassword || !confirmPassword ||!passwordValid) {
        setError("Passwords don't match or fields are empty");
        return;
      }
   
      
      const res = await axios.get('/users.json');
      const users = res.data.users;
      const user = users.find(user => user.id === parseInt(id));
  
      if (user) {
        const updatedUser = { ...user, password: newpassword };
  
        const updateRes = await axios.put("http://localhost:8000/users", updatedUser);
  
        if (updateRes.status === 200) {
          setProfile(updatedUser);
        } else {
          setError("Failed to update the password");
        }
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Error occurred while updating the password");
    }
  };
  

  const handleOut = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    handleLogout(); // Call the onLogout function passed as a prop to update the isLoggedIn state in App
    navigate("/login"); // Redirect to login page
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('id', userProfile.id);

      try {
        await axios.post('http://localhost:8000/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error("Error uploading image");
      }
    }
  };

 
 
    

  useEffect(() => {
  getUser();
  }, [id]);

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  return (
    <div className='container mt-5'>
      <div className='row gap-5 pt-5'>


        <ProfileContainer className='col-md-3 py-4'>


        <NameProfile className='text-center'> Welcome {userProfile.name || ''} !</NameProfile>
 
            <ProfileButton>My Orders</ProfileButton>
            <Link style={{textDecoration:'none'}} to='/wishlist'> <ProfileButton>Wishlist</ProfileButton> </Link>
            <ProfileButton>Notification</ProfileButton>
            <ProfileButton>Settings</ProfileButton>
            <StraightLine className='w-100'/>
            <ProfileButton onClick={handleOut}>Logout</ProfileButton>
          </ProfileContainer>

        <ProfileContainer className='col-md-7 py-4'>

          <div className='d-flex justify-content-between'>

            <div className='d-flex flex-column ms-3'>
              <NameProfile>My profile</NameProfile>

              <div className='d-flex align-items-center'>
                <DataProfile>Name:</DataProfile>
                <DetailsProfile>{userProfile.name}</DetailsProfile>
              </div>

              <div className='d-flex align-items-center'>
                <DataProfile>Email:</DataProfile>
                <DetailsProfile>{userProfile.email}</DetailsProfile>
              </div>

              <ProfileLabel type='button' data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div>Change password</div>
              </ProfileLabel>
            </div>

            <div className='d-flex flex-column align-items-center me-1'>
         
            <img
            src={userProfile.image ? userProfile.image : preview}
            alt='Profile'
            className='rounded-circle w-50 h-75'
          />
         
       
       <input
       type='file'
       accept='image/*'
       onChange={handleFileUpload}
       id ='image'
       style={{display:'none'}}
       />   
           <ProfileLabel for='image'>  <div>upload your image </div>  </ProfileLabel>
         
 

   
          </div>

          </div>

          
        </ProfileContainer>
      </div>


      {/* Modal for Change Password */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <form onSubmit={handleSubmit}> 
              <div className="modal-body mx-auto text-center">
                <LabelAuth style={{color:'white'}}>
                  Enter old password
                  <InputAuth
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </LabelAuth>

                <LabelAuth style={{color:'white'}}>
                  Enter new password
                  <InputAuth
                    type="password"
                    value={newpassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                </LabelAuth>

                <LabelAuth style={{color:'white'}}>
                  Confirm your password
                  <InputAuth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </LabelAuth>

                {error && <p className='p-2 mt-2' style={{color:'red'}}>{error}</p>}
              </div>
              <div className="modal-footer d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <Savechanges type="submit">Save changes</Savechanges>
                </div>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;