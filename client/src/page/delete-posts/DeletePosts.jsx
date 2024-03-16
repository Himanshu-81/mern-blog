import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotification } from "../../utils/notification";
import Loading from "../../components/Loading";

const DeletePosts = () => {
  const [loading, setLoading] = useState(null);

  const { id } = useParams();
  const notification = useNotification();

  useEffect(() => {
    const deletePost = async (id) => {
      try {
        setLoading(true);
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/posts/delete-post/${id}`,
          { withCredentials: true }
        );
        const deletedPost = await response.data;
        console.log(deletedPost);
        setLoading(false);
        notification(deletedPost.message, "success");
        window.history.back();
      } catch (error) {
        setLoading(false);
        notification(error.response.data.message, "error");
        console.log(error);
      }
    };

    deletePost(id);
  }, []);

  return <div>{loading && <Loading />}</div>;
};

export default DeletePosts;
