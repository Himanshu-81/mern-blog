import React, { useState, useEffect } from "react";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../utils/notification";

import "./CreatePosts.css";

const CreatePosts = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const notification = useNotification();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "uncategorized",
    "weather",
  ];

  const handleDescriptionChange = (content, delta, source, editor) => {
    setDescription(content);
    setValue("description", content);
  };

  useEffect(() => {
    register("description");
  }, [register]);

  const createPost = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("description", description);
      formData.append("thumbnail", data.thumbnail[0]);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/create-post`,
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      const createdPost = await response.data;
      if (!createdPost) {
        notification("something went wrong try again later", "error");
      }
      notification(response.data.message, "success");
      navigate("/");
    } catch (error) {
      setLoading(false);
      notification(error.response.data.message, "error");
      console.log(error);
    }
  };

  return (
    <section className="create-post">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <h2>Create Post</h2>
          <form
            className="form create-post__form"
            onSubmit={handleSubmit(createPost)}
          >
            {errors.title ? (
              <span className="error-message">Title is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />

            {errors.category ? (
              <span className="error-message">Category is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <select {...register("category", { required: true })}>
              {POST_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <ReactQuil
              modules={modules}
              formats={formats}
              onChange={handleDescriptionChange}
            />

            {errors.thumbnail ? (
              <span className="error-message">Thumbnail is required</span>
            ) : (
              <span className="error-message"></span>
            )}
            <input
              type="file"
              accept="png, jpg, jpeg"
              {...register("thumbnail", { required: true })}
            />
            <button type="submit" className="btn primary">
              Create
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default CreatePosts;
