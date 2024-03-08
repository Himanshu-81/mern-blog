import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notification = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: 3000,
      preventDuplicate: true,
    });
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        { withCredentials: true }
      );
      const loginUser = await response.data;
      if (!loginUser) {
        notification("something went wrong try again later", "error");
      } else {
        notification(response.data.message, "success");
        navigate("/");
      }
      notification(response.data.message, "success");
      navigate("/");
    } catch (error) {
      notification(error.response.data.message, "error");
    }
  };

  return (
    <section className="login">
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
    </section>
  );
};

export default Login;
