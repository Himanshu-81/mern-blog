import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Dashboard.css";
import axios from "axios";
import Loading from "../../components/Loading.jsx";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const userDashboard = async (id) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts//author-posts/${id}`
        );

        const authorPosts = await response.data;
        setLoading(false);
        setPosts(authorPosts.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    userDashboard(id);
  }, [id]);

  return (
    <section className="dashboard">
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts.length ? (
            <div className="container dashboard__container">
              {posts.map((post) => (
                <article key={post._id} className="dashboard__post">
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={post.thumbnail} alt="" />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post._id}`} className="btn sm">
                      View
                    </Link>
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="btn sm primary"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete-post/${post._id}`}
                      className="btn sm danger"
                    >
                      Delete
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <h2 className="center">You don't have any posts yet</h2>
          )}
        </>
      )}
    </section>
  );
};

export default Dashboard;
