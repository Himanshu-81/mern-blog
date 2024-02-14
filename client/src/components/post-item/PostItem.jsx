import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "../post-author/PostAuthor.jsx";
import "./PostItem.css";

const PostItem = ({ postID, category, title, desc, authorID, thumbnail }) => {
  const shortDescription =
    desc.length > 145 ? desc.substr(0, 145) + "..." : desc;
  const postTitle = title.length > 30 ? desc.substr(0, 30) + "..." : desc;
  return (
    <article className="post">
      <div className="post__thumbnail">
        <img src={thumbnail} alt={postTitle} />
      </div>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post__footer">
          <PostAuthor authorID={authorID} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
