import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import Loading from "./Loading";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { loginUser } = useUser();

  useEffect(() => {
    if (authentication && !loginUser) {
      navigate("/login");
    }
    setLoader(false);
  }, [loginUser, navigate, authentication]);

  return loader ? <Loading /> : <>{children}</>;
}
