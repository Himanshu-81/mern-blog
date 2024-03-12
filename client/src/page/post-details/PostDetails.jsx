import React, { useEffect, useState } from "react";
import PostAuthor from "../../components/post-author/PostAuthor";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

import "./PostDetails.css";
import { useUser } from "../../context/userContext";

const PostDetails = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(null);

  const { id } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const getPostDetails = async (id) => {
      try {
        setLoading(true);
        const post = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/get-post/${id}`
        );
        setLoading(false);
        setPost(post.data.data);
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
            <PostAuthor authorID={post.createdBy} />
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
