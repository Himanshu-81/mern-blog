import React from "react";
import HashLoader from "react-spinners/HashLoader";

const override = {
  height: "80vh",
  width: "100%",
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
      data-testid="loader"
      cssOverride={override}
    />
  );
};

export default Loading;
