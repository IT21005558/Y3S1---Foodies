import React, { useState, useEffect } from "react";
import axios from "axios";
import './CommentStyle/AllComments.css';
import LikeButton from './Like.js';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/paf/comments").then((response) => {
      setComments(response.data);
    });
  }, []);

  const handleAddComment = () => {
    const comment = { text: newCommentText, likes: 0 };
    axios.post("http://localhost:8080/paf/addComments", comment).then((response) => {
      setComments([...comments, response.data]);
      setNewCommentText("");
    });
  };

  const handleDeleteComment = (comment_id) => {
    axios.delete(`http://localhost:8080/paf/DeleteComments/${comment_id}`)
      .then(() => {
        setComments(comments.filter((comment) => comment.comment_id !== comment_id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUpdateComment = (comment_id, updatedComment) => {
    axios.put(`http://localhost:8080/paf/UpdateComments/${comment_id}`, updatedComment)
      .then((response) => {
        setComments(
          comments.map((comment) =>
            comment.comment_id === comment_id ? response.data : comment
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLikeComment = (comment_id) => {
    axios.put(`http://localhost:8080/paf/LikeComments/${comment_id}`)
      .then((response) => {
        setComments(
          comments.map((comment) =>
            comment.comment_id === comment_id ? response.data : comment
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <span>
              {comment.text}{" "}
              <button className="delete" onClick={() => handleDeleteComment(comment.comment_id)}>
                Delete
              </button>{" "}
              <button className="update"
                onClick={() => {
                  const updatedCommentText = prompt(
                    "Enter the updated comment text:",
                    comment.comment_id
                  );
                  if (updatedCommentText !== null) {
                    handleUpdateComment(comment.comment_id, {
                      text: updatedCommentText,
                    });
                  }
                }}
              >
                Edit
              </button>{" "}
              <LikeButton onClick={() => handleLikeComment(comment.comment_id)}>
                <i className="Like"></i> {comment.likes}
              </LikeButton>
            </span>
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          placeholder="Write your comment here..."
        />
        <button className="postComment" onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentList;