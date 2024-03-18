//USER PROFILE DELETE BY USERNAME CODE WITH POPUP and TOAST MESSAGE COMPLETE CODE (BACKEND TESTING PASSED, FRONTEND PASSED)

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../UserStyle/DeleteUser.css';
import { useNavigate } from "react-router-dom";


function DeleteUser() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/cus/delete/${username}`);
        console.log(response.data);
       
      
        toast.success("User Deleted"); // show a success message to the user
        setUsername(''); // clear the input field

        navigate("/log");

      } catch (error) {
        console.error(error);
        toast.error("Error Deleting User"); // show an error message to the user
      }
    }
  };

  return (
    <div className="delete-user-container">
      <form onSubmit={handleSubmit}>
        <label>
        <center>Enter the Username: </center>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <button type="submit">Delete Account</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default DeleteUser;

