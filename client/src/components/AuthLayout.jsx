import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import Loading from "./Loading";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { userLogin } = useUser();

  useEffect(() => {
    if (authentication && !userLogin) {
      navigate("/login");
    }
    setLoader(false);
  }, [userLogin, navigate, authentication]);

  return loader ? <Loading /> : <>{children}</>;
}
