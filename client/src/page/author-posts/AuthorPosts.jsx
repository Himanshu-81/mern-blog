import React, { useEffect, useState } from "react";
import PostItem from "../../components/post-item/PostItem.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading.jsx";
import { postTimeCalculate } from "../../utils/postTimeCalculate.js";
import "./AuthorPosts.css";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  const { id } = useParams();

  const calculateRelativeTime = postTimeCalculate();

  useEffect(() => {
    const getAuthorPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts//author-posts/${id}`
        );
        const authorPosts = await response.data;
        setLoading(false);
        const posts = authorPosts.data.map((post) => ({
          ...post,
          relativeTime: calculateRelativeTime(post.updatedAt),
        }));
        setPosts(posts);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
      }
    };

    getAuthorPosts();
  }, []);

  return (
    <section className="author-posts">
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts.length > 0 ? (
            <div className="container posts__container">
              {posts.map(
                ({
                  _id,
                  thumbnail,
                  category,
                  title,
                  description,
                  createdBy,
                  relativeTime,
                }) => (
                  <PostItem
                    key={_id}
                    postID={_id}
                    thumbnail={thumbnail}
                    category={category}
                    description={description}
                    authorID={createdBy}
                    title={title}
                    postTime={relativeTime}
                  />
                )
              )}
            </div>
          ) : (
            <h2 className="center">No posts by author yet!</h2>
          )}
        </>
      )}
    </section>
  );
};

export default AuthorPosts;
