import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { logoutUser } from "../../utils/logout.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import "./Header.css";

const Header = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      true;
    }
  };

  const handleLogout = async () => {
    await logoutUser(enqueueSnackbar, navigate);
    closeNavHandler();
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <img src={Logo} alt="logo" />
        </Link>
        {isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/profile/dfkdl" onClick={closeNavHandler}>
                John Doe
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              {" "}
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => {
            setIsNavShowing((prev) => !prev);
          }}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
