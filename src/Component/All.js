import React, { useState, useEffect } from 'react';
import './PostStyle/All.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CommentList from './AllComments.js';
import userProfile from './Allpost.js';


function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/paf/allpost')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, []);

  const handleCommentClick = (postId) => {
    // Implement logic to handle comment click
    console.log(`Comment clicked for post ${postId}`);
  };

  return (
    <div className="post-list-wrapper">
      <div className="header">
        <div className="button-container">
            <Link to = "/all">
                <FontAwesomeIcon icon={faUserCircle} className="profileBtn" />
            </Link>         
        </div>
        <h1>FOODIES</h1>
      </div>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-container post-size">
            <h2>{post.caption}</h2>
            <p>{post.expression}</p>
            <div className="photo-container">
              {post.photos.map((photo, index) => (
                <img key={index} className="photo post-size" src={`data:image/jpeg;base64,${photo}`} alt="" />
              ))}
            </div>
            <div className="comment-container">
            <FontAwesomeIcon icon={faComment} onClick={() => handleCommentClick(post.id)} />
              <span>
              <CommentList>  </CommentList>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;

//className="comment-label"