import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostStyle/Allpost.css';
import { Link, Navigate } from 'react-router-dom';
import './UserStyle/profile.css'; 

import { faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


const Allpost = () => {

  const [userProfile, setUserProfile] = useState(null);
  const userId = localStorage.getItem('userid');

  const [posts, setPosts] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  //const userid = 1;

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get(`http://localhost:8080/cus/profile/${userId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get(`http://localhost:8080/paf/user/${userId}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((currentPhotoIndex + 1) % posts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentPhotoIndex, posts]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/paf/deletepost/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
      // TODO: Handle error and show error message to the user
    }
  };

  const handleImageClick = (index) => {
    setCurrentPhotoIndex(index);
  };

  if (!userProfile) {
    return <div>Loading user profile...</div>;
  }




  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log out'
    }).then((result) => {
      if (result.isConfirmed) {
        
       
        window.location.href = '/';
      }
    });
  }





  return (

             

    <>


<div className="add-new-button-container">
       
        <Link to="/home">
          <FontAwesomeIcon icon={faHome} className="homeBtn" />
        </Link>
        {" "}
      <Link >
      <FontAwesomeIcon icon={faSignOut} className="lgOutBtn"  onClick={handleSignOut} />
      
      </Link>
   

      </div>

     <div className="profile-page-container">
      <center><h1 className="page-heading">My Profile</h1></center>
      <div className="profile-container">
        <div className="profile-image-container">
          <img src={`data:image/png;base64,${userProfile.profilepictureurl}`} alt="Profile" className="profile-image rounded" id='profImg' />
        </div>
        <div className="user-text-container">
          <div className="user-name-container"> 
            
            <span className="user-text-value">{userProfile.username}</span>
          </div>
          <div className="email-container">
            <span className="user-text-value">{userProfile.email}</span>
          </div>
          <div className="bio-container">
            
            <span className="user-text-value">{userProfile.bio}</span>
          </div>
          <br />


          <Link to= '/update' className="update-profile-button">
  Update Profile
</Link>

{" "}
      <Link to = "/del">
      <FontAwesomeIcon icon={faTrash} className="trashBtn" />
      </Link>




          {/* <Link to={`/user/${userId}/update`} className="update-profile-button"> */}
            {/* Update Profile */}
          {/* </Link> */}
        </div>
      </div>
    </div>

    <Link to="/add">
          <button id='addbtn'>Add New Post</button>
        </Link>
        {" "}
      
      <div className="gallery-container">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className={`gallery-item ${
              index === currentPhotoIndex ? 'active' : ''
            }`}
          >
            <div className="gallery-photos-container">
              {post.photos.map((photo, photoIndex) => (
                <img
                  key={photoIndex}
                  src={`data:image/jpeg;base64,${photo}`}
                  alt={post.caption}
                  onClick={() => handleImageClick(photoIndex)}
                />
              ))}
            </div>
            <div className="gallery-caption">
              <h3>{post.caption}</h3>
              <p>{post.expression}</p>
              <div className="buttons-container">
                <Link to={`/edit/${post.id}`}>Edit</Link>
                <button onClick={() => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this post!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(post.id);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      Swal.fire(
        'Deleted!',
        'Your post has been deleted.',
        'success'
      )
    }
  })
}}>
  Delete
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>








  );
};

export default Allpost;
