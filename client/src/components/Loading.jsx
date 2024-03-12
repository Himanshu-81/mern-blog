import React from "react";
import HashLoader from "react-spinners/HashLoader";

const override = {
  minHeight: "100vh",
  minWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Loading = () => {
  return (
    <HashLoader
      color="#d69c36"
      size={75}
      aria-label="Loading Spinner"
      cssOverride={override}
      data-testid="loader"
    />
  );
};

export default Loading;
