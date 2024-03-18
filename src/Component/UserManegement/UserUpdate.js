import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    profilepictureurl: null,
    bio: '',
  });
  const [id, setId] = useState('');

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('name', formData.name);
    data.append('password', formData.password);
    data.append('profilepictureurl', formData.profilepictureurl);
    data.append('bio', formData.bio);

    try {
      const response = await axios.put(`http://localhost:8080/cus/updateuser/${id}`, data);
      toast.success(response.data, { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
      }
    }
  };

  return (
    <div className="updatebackground">
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Update User</h2>
        <label>
          ID:
          <input type="text" name="id" onChange={handleIdChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Profile Picture:
          <input type="file" name="profilepictureurl" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Bio:
          <textarea name="bio" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default UpdateUser;