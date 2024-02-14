import React, { useState } from "react";
import Avatar1 from "../../images/avatar1.jpg";
import Avatar2 from "../../images/avatar2.jpg";
import Avatar3 from "../../images/avatar3.jpg";
import Avatar4 from "../../images/avatar4.jpg";
import Avatar5 from "../../images/avatar5.jpg";
import { Link } from "react-router-dom";

import "./Authors.css";

const authorData = [
  {
    id: 1,
    name: "John Doe",
    avatar: Avatar1,
    posts: 10,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: Avatar2,
    posts: 15,
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: Avatar3,
    posts: 8,
  },
  {
    id: 4,
    name: "Bob Brown",
    avatar: Avatar4,
    posts: 20,
  },
  {
    id: 5,
    name: "Emily Davis",
    avatar: Avatar5,
    posts: 12,
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorData);
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/users/${id}`} className="author">
              <div className="author__avatar">
                <img src={avatar} alt={`Image of ${name}`} />
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center">No user/authors found</h2>
      )}
    </section>
  );
};

export default Authors;
