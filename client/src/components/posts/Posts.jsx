import React, { useEffect, useState } from "react";
import PostItem from "../post-item/PostItem.jsx";
import axios from "axios";
import Loading from "../Loading.jsx";
import { postTimeCalculate } from "../../utils/postTimeCalculate.js";

import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  const calculateRelativeTime = postTimeCalculate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/posts`,
  {
    headers: {
      'Content-Type': 'application/json',
    }
  }
);
        setLoading(false);
        const postsData = posts.data.data.map((post) => ({
          ...post,
          relativeTime: calculateRelativeTime(post.updatedAt),
        }));
        setPosts(postsData);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <section className="posts">
      {loading ? (
        <Loading />
      ) : posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map((post) => (
            <PostItem
              key={post._id}
              postID={post._id}
              thumbnail={post.thumbnail}
              category={post.category}
              description={post.description}
              authorID={post.createdBy}
              title={post.title}
              postTime={post.relativeTime}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found!</h2>
      )}
    </section>
  );
};

export default Posts;
