import { useSnackbar } from "notistack";

const MyButton = ({ text }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <button
      className="btn primary"
      onClick={() =>
        enqueueSnackbar("Registration successfully please login", {
          variant: "success",
          preventDuplicate: true,
        })
      }
    >
      testing button
    </button>
  );
};

export default MyButton;
