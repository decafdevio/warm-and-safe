import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { FiLogIn } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import Loading from "./Loading";
import "../styles/modal.css";

function Modal(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      document.getElementById("information").style.display = "none";
      document.getElementById("formhere").style.display = "block";
      props.onClose();
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // function windowReload() {
  //   window.location.reload();
  // }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (props.header === "login") {
    return (
      <div className={`modal ${props.show ? "show" : ""}`}>
        <main className="modal-content">
          <button onClick={props.onClose} className="cancelBtn">
            <ImCancelCircle size="25px" />
          </button>

          <header id="modal-header">
            <h4 className="modal-login-title">Account Login</h4>
          </header>

          <section className="modal-body">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                className="form-input"
                id="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={onChange}
              />
              <br />
              <input
                type="password"
                className="form-input"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              <br />
              <button type="submit" id="login-btn">
                Login
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default Modal;
