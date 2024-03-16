import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import Loading from "../../components/Loading";
import { useUser } from "../../context/userContext";
import { useForm } from "react-hook-form";
import { useNotification } from "../../utils/notification.js";

import "./UserProfile.css";

const UserProfile = () => {
  const [avatar, setAvatar] = useState();
  const [showEditAvatar, setShowEditAvatar] = useState(true);
  const [loadingAvatar, setLoadingAvatar] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(null);

  const { user, login } = useUser();

  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    formState: { errors: errorsDetails },
  } = useForm();
  const { register: registerAvatar, handleSubmit: handleSubmitAvatar } =
    useForm();
  const notification = useNotification();

  const avatarInputChange = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
    setShowEditAvatar((prev) => !prev);
  };

  const changeUserAvatar = async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      setShowEditAvatar((prev) => !prev);
      setLoadingAvatar(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        formData,
        { withCredentials: true }
      );
      const updatedAvatar = await response.data;
      setLoadingAvatar(false);
      notification(updatedAvatar.message, "success");
      login(updatedAvatar.data);
    } catch (error) {
      setLoadingAvatar(false);
      notification(error.response.data.message, "error");
    }
  };

  const updateUserDetails = async (data) => {
    try {
      setLoadingDetails(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/update-user`,
        data,
        { withCredentials: true }
      );

      const updatedUser = await response.data;
      setLoadingDetails(false);
      notification(updatedUser.message, "success");
      login(updatedUser.data);
    } catch (error) {
      setLoadingDetails(false);
      notification(error.response.data.message, "error");
    }
  };

  return (
    <section className="profile">
      {loadingAvatar || loadingDetails ? (
        <Loading />
      ) : (
        <div className="container profile__container">
          <Link to={`/myposts/${user?._id}`} className="btn">
            My posts
          </Link>

          <div className="profile__details">
            <div className="avatar__wrapper">
              <div className="profile__avatar">
                <img src={user.avatar} alt="" />
              </div>
              {/* Form to update avatar */}
              <form
                className="avatar__form"
                onSubmit={handleSubmitAvatar(changeUserAvatar)}
              >
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="png, jpg, jpeg"
                  onChange={avatarInputChange}
                />
                {showEditAvatar ? (
                  <label htmlFor="avatar">
                    <FaEdit />
                  </label>
                ) : (
                  <button className="profile__avatar-btn">
                    <FaCheck />
                  </button>
                )}
              </form>
            </div>
            <h1>{user.name}</h1>

            {/* Form to update user details */}

            <form
              className="form profile__form"
              onSubmit={handleSubmitDetails(updateUserDetails)}
            >
              <h5 style={{ textAlign: "left" }}>
                Want to update the profile details?
              </h5>
              {errorsDetails.name ? (
                <span className="error-message">Name is required</span>
              ) : (
                <span className="error-message"></span>
              )}
              <input
                type="text"
                placeholder="Enter Name"
                {...registerDetails("name", { required: true })}
              />

              {errorsDetails.email ? (
                <span className="error-message">Email is required</span>
              ) : (
                <span className="error-message"></span>
              )}
              <input
                type="email"
                placeholder="Enter Email"
                {...registerDetails("email", { required: true })}
              />

              {errorsDetails.oldPassword ? (
                <span className="error-message">Password is required</span>
              ) : (
                <span className="error-message"></span>
              )}
              <input
                type="password"
                placeholder="Enter Current Password"
                {...registerDetails("oldPassword", { required: true })}
              />

              {errorsDetails.newPassword ? (
                <span className="error-message">Password is required</span>
              ) : (
                <span className="error-message"></span>
              )}
              <input
                type="password"
                placeholder="Enter New Password"
                {...registerDetails("newPassword", { required: true })}
              />

              <button className="btn primary">Update details</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
