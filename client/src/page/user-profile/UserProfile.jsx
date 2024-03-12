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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassoword, setNewPassword] = useState("");
  const [showEdit, setShowEdit] = useState(true);

  const [loading, setLoading] = useState(null);

  const { user, login } = useUser();

  const { register, handleSubmit } = useForm();
  const notification = useNotification();

  const avatarInputChange = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
    setShowEdit((prev) => !prev);
  };

  const changeUserAvatar = async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      setShowEdit((prev) => !prev);
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        formData,
        { withCredentials: true }
      );
      const updatedAvatar = await response.data;
      setLoading(false);
      notification(updatedAvatar.message, "success");
      login(updatedAvatar.data);
    } catch (error) {
      setLoading(false);
      notification(error.response.data.message, "error");
    }
  };

  return (
    <section className="profile">
      {loading ? (
        <Loading />
      ) : (
        <div className="container profile__container">
          <Link to={`/myposts/fjdklsf`} className="btn">
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
                onSubmit={handleSubmit(changeUserAvatar)}
              >
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="png, jpg, jpeg"
                  onChange={avatarInputChange}
                />
                {showEdit ? (
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
            <h1>John Doe</h1>

            {/* Form to update user details */}
            <form className="form profile__form">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassoword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button type="submit" className="btn primary">
                Update details
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
