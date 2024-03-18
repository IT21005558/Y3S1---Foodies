import React, { useState } from 'react';
import axios from 'axios';
import '../UserStyle/UserRegister.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegistrationForm() {
  
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilepictureurl', profilePicture);
    formData.append('bio', bio);

   
    try {
      const response = await axios.post('http://localhost:8080/cus/adduser', formData);
      console.log(response.data);
      toast.success("User Registered Successfully!");
      window.location.href = '/log';
     
    }     
    catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
    
   
  };
//USER REGISTRATION FORM
  return (
    <div className="regbackground">
      <div className="center">
      <form onSubmit={handleSubmit}>
          <h2>User Registration</h2>

          <div className="form-group">
          <label>Username</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
          </div>

          <div className="form-group">
          <label>Name</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
          </div>

          <div className="form-group">
          <label>Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div className="form-group">
          <label>Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>

          <div className="form-group">
          <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={(event) => setProfilePicture(event.target.files[0])} />
          </div>

          <div className="form-group">
          <label>Bio</label>
            <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
          </div>
          
          <button type="submit">Register</button>
        </form>
        <ToastContainer />
      </div>
      </div>
  );
}

export default RegistrationForm;