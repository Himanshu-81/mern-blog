import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <HashLoader
      color="#d69c36"
      size={75}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
