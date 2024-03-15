import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

import "./Authors.css";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        setLoading(true);
        const reponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );
        const fetchedAuthors = await reponse.data;
        setLoading(false);
        setAuthors(fetchedAuthors.data);
      } catch (error) {
        setLoading(false);
      }
    };

    getAuthors();
  }, []);
  return (
    <section className="authors">
      {loading ? (
        <Loading />
      ) : (
        <>
          {authors.length > 0 ? (
            <div className="container authors__container">
              {authors.map(({ _id, avatar, name, posts }) => (
                <Link key={_id} to={`/posts/users/${_id}`} className="author">
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
        </>
      )}
    </section>
  );
};

export default Authors;
