import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../images/avatar1.jpg";
import "./PostAuthor.css";

const PostAuthor = () => {
  return (
    <Link to={`/posts/user/author`} className="post__author">
      <div className="post__author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="post__author-details">
        <h5>By: Himanshu</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
