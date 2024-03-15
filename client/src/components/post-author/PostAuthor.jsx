import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./PostAuthor.css";

const PostAuthor = ({ authorID, postTime }) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    if (authorID == undefined) {
      return;
    }
    const getAuthor = async (id) => {
      try {
        const author = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/get-user/${id}`
        );
        setAuthor(author.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAuthor(authorID);
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
      <div className="post__author-avatar">
        <img src={author.avatar} alt="" />
      </div>
      <div className="post__author-details">
        <h5>By: {author.name}</h5>
        <small>{postTime}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
