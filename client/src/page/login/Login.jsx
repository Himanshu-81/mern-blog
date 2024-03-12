import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/userContext";
import Loading from "../../components/Loading.jsx";
import { useNotification } from "../../utils/notification.js";

import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const notification = useNotification();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        { withCredentials: true }
      );
      setLoading(false);
      const loginUser = await response.data;
      if (!loginUser) {
        notification("something went wrong try again later", "error");
      }
      login(loginUser.data.loggedInUser);
      notification(response.data.message, "success");
      navigate("/");
    } catch (error) {
      setLoading(false);
      notification(error.response.data.message, "error");
    }
  };

  return (
    <section className="login">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <h2>Sign In</h2>
          <form className="form login__form" onSubmit={handleSubmit(loginUser)}>
            {errors.email ? (
              <span className="error-message">Email is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />

            {errors.password ? (
              <span className="error-message">Password is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />

            <button className="btn primary">Login</button>
          </form>
          <small>
            Don't have an account? <Link to="/register">sign up</Link>
          </small>
        </div>
      )}
    </section>
  );
};

export default Login;
