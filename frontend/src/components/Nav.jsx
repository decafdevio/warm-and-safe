import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { RiAccountCircleLine, RiInformationLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { logout, reset } from "../features/auth/authSlice";
import logoimg from "../img/logo.png";
import "../styles/nav.css";

function Navbar() {
  const [show, setShow] = useState(false);
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
        <img id="logo-image" src={logoimg} />
        {/* <div id="appname-container">
          <h2 id="appname">WARMBANKS</h2>
        </div>
        <header id="information" className="action-button">
          <RiInformationLine />
        </header>
         */}
      </header>
      <div className="top-right">
        {user ? (
          <div id="account-out" className="action-button" onClick={onLogout}>
            <FiLogOut />
          </div>
        ) : (
          <div
            id="account-in"
            className="action-button"
            onClick={() => setShow(true)}
          >
            <RiAccountCircleLine />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
