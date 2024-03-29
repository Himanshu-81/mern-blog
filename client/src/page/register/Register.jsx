import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import { useNotification } from "../../utils/notification";

import "./Register.css";

const Register = () => {
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      const fields = ["name", "email", "password", "confirmPassword"];

      fields.forEach((field) => formData.append(field, data[field]));

      formData.append("avatar", data.avatar[0]);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        formData
      );
      setLoading(false);
      const newUser = await response.data;
      if (!newUser) {
        notification("something went wrong try again later", "error");
      }
      notification(response.data.message, "success");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      notification(error.response.data.message, "error");    
    }
  };

  return (
    <section className="register">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <h2>Sign Up</h2>
          <form
            className="form register__form"
            onSubmit={handleSubmit(registerUser)}
          >
            {errors.name ? (
              <span className="error-message">Name is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
            />

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

            {errors.avatar ? (
              <span className="error-message">Avatar is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <label htmlFor="avatar" style={{ marginBottom: "-16px" }}>
              Select a profile picture
            </label>
            <input
              type="file"
              id="avatar"
              {...register("avatar", { required: true })}
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

            {errors.confirmPassword ? (
              <span className="error-message">
                Confirm password is required
              </span>
            ) : (
              <span className="error-message"></span>
            )}
            <input
              type="password"
              name=""
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            />

            <button className="btn primary">Register</button>
          </form>

          <small>
            Already have an account? <Link to="/login">sign in</Link>
          </small>
        </div>
      )}
    </section>
  );
};

export default Register;
