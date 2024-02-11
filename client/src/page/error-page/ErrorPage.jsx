import React from "react";
import { Link } from "react-router-dom";
import Error from "../../images/error.png";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="error">
        <Link to="/" className="btn">
          Go Back Home
        </Link>
        <img src={Error} />
      </div>
    </section>
  );
};

export default ErrorPage;
