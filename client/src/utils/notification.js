import { useSnackbar } from "notistack";

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: 3000,
      preventDuplicate: true,
    });
  };

  return notification;
};
