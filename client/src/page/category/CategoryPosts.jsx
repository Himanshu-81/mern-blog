import React, { useEffect, useState } from "react";
import PostItem from "../../components/post-item/PostItem.jsx";
import { useParams } from "react-router-dom";
import "./CategoryPosts.css";
import axios from "axios";
import Loading from "../../components/Loading.jsx";
import { postTimeCalculate } from "../../utils/postTimeCalculate.js";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const { category } = useParams();
  const calculateRelativeTime = postTimeCalculate();

  useEffect(() => {
    const fetchPostByCategory = async (category) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${category}`
        );
        const categoryPosts = response.data.data.map((post) => ({
          ...post,
          relativeTime: calculateRelativeTime(post.updatedAt),
        }));
        setLoading(false);
        setPosts(categoryPosts);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchPostByCategory(category);
  }, [category]);

  return (
    <section className="">
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts?.length > 0 ? (
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
            <h2 className="center">No posts found!</h2>
          )}
        </>
      )}
    </section>
  );
};

export default CategoryPosts;
