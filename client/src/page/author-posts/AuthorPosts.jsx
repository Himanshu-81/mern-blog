import React, { useState } from "react";
import { DUMMY_POSTS } from "../../config.js";
import PostItem from "../../components/post-item/PostItem.jsx";
import "./AuthorPosts.css";

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="author-posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              desc={desc}
              authorID={authorID}
              title={title}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found!</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
