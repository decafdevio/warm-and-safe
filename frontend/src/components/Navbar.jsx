import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { RiAccountCircleLine, RiInformationLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect } from "react";

function Navbar() {
  const [show, setShow] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    alert("Logged Out");
    window.location.reload();
  };

  return (
    <>
      <Modal onClose={() => setShow(false)} show={show} header="login" />

      <header id="nav-container">
        <div id="appname-container">
          <h2 id="appname">WARMBANKS</h2>
        </div>
        <header id="information" className="action-button">
          <RiInformationLine />
        </header>

        {user ? (
          <header id="account-out" className="action-button" onClick={onLogout}>
            <FiLogOut />
          </header>
        ) : (
          <header
            id="account-in"
            className="action-button"
            onClick={() => setShow(true)}
          >
            <RiAccountCircleLine />
          </header>
        )}
      </header>
    </>
  );
}

export default Navbar;
