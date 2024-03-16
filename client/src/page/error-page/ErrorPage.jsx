import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="error">
        <Link to="/" className="btn">
          Go Back Home
        </Link>
        <p style={{ color: "red" }}>Resource not found</p>
      </div>
    </section>
  );
};

export default ErrorPage;
