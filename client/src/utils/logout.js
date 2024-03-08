import axios from "axios";

export const logoutUser = async (enqueueSnackbar, navigate) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    const logoutUser = await response.data;
    if (!logoutUser) {
      enqueueSnackbar("something went wrong try again later", {
        variant: "error",
      });
    }
    enqueueSnackbar(response.data.message, { variant: "success" });
    navigate("/");
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
