import React, { useEffect, useState } from "react";
import PostAuthor from "../../components/post-author/PostAuthor";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { postTimeCalculate } from "../../utils/postTimeCalculate.js";

import "./PostDetails.css";
import { useUser } from "../../context/userContext";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(null);

  const { id } = useParams();
  const { user } = useUser();

  const calculateRelativeTime = postTimeCalculate();

  useEffect(() => {
    const getPostDetails = async (id) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/get-post/${id}`
        );
        const authorPost = await response.data;
        setLoading(false);
        (authorPost.data.relativeTime = calculateRelativeTime(
          authorPost.data.updatedAt
        )),
          setPost(authorPost.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getPostDetails(id);
  }, []);

  return (
    <section className="post-detail">
      {loading ? (
        <Loading />
      ) : (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor
              authorID={post.createdBy}
              postTime={post.relativeTime}
            />
            {post.createdBy == user._id && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  edit
                </Link>
                <Link
                  to={`/posts/${post._id}/delete`}
                  className="btn sm danger"
                >
                  delete
                </Link>
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={post.thumbnail} alt="thumbnail" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetails;
