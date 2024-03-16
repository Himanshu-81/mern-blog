import React, { useEffect, useState, useRef } from "react";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

import "./EditPosts.css";
import axios from "axios";
import Loading from "../../components/Loading";

const EditPosts = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(null);

  const { id } = useParams();
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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
    " Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "uncategorized",
    "weather",
  ];

  useEffect(() => {
    const getPostDetails = async (id) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/get-post/${id}`
        );
        const postDetails = await response.data;
        setLoading(false);
        setValue("title", postDetails.data.title);
        setValue("category", postDetails.data.category);
        setValue(
          "description",
          postDetails.data.description || "uncategorized"
        );
        const thumbnail = postDetails.post.thumbnail;

        if (thumbnail) {
          setValue("thumbnail", thumbnail);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getPostDetails(id);
  }, [id]);

  return (
    <section className="create-post">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <h2>Edit Post</h2>
          <form className="form create-post__form">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />

            <select {...register("category", { required: true })}>
              {POST_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <ReactQuil
              modules={modules}
              formats={formats}
              {...register("description", { required: true })}
              onChange={setDescription}
            />
            <input
              type="file"
              value={thumbnail}
              {...register("thumbnail", { required: true })}
              accept="png, jpg, jpeg"
            />
            <button type="submit" className="btn primary">
              Update
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default EditPosts;
