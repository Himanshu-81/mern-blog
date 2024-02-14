import React, { useState } from "react";
import PostItem from "../post-item/PostItem.jsx";

import { DUMMY_POSTS } from "../../config.js";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="posts">
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

export default Posts;
