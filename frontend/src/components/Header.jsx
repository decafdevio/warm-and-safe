import React from "react";
import { RiHomeHeartFill } from "react-icons/ri";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/">
        <RiHomeHeartFill size="36px" color="black" />
      </Link>
      <h1>www.warmbanks.net</h1>
      <ul>
        {user ? (
          <li>
            <button className="loginoutbutton" onClick={onLogout}>
              <FiLogOut size="36px" color="black" /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/Admin">
                <FiLogIn size="36px" color="black" /> Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
