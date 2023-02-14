import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { FiLogIn } from "react-icons/fi";
import Loading from "../components/Loading";

function Admin() {
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

    // if (formData.name = "admin") {
    //   navigate('/Admin')
    // }
    //doesn't work?????????????????????????????????????

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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

  return (
    <>
      <section className="heading">
        <h1>
          <FiLogIn /> Login
        </h1>
      </section>
      <section className="form">
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
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Admin;
