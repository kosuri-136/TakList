import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/user";
import navbaricon from "../../assets/images/navicon.png";
import "../NavBar/NavBar.css";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // to toggle between show and hide password
  const { register, handleSubmit } = useForm(); // useForm is used to handle the form submit,it makes form handling easier
  const { loading, message, error } = useSelector(
    (state) => state.registerUser
  );
  console.log(loading, message, error);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data)); // dispatch action for registering a user
  };

  useEffect(() => {
    // if registration is success navigate to login
    if (message) {
      navigate("/");
    }
    if (error) {
      return;
    }
  }, [message, error, navigate]);
  return (
    <>
      <div className="pb-4">
        <nav class="navbar navbar-light bg-white custom-nav">
          <span class="navbar-brand nav-text">
            <img
              src={navbaricon}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt="icon"
              onClick={() => navigate("/")}
            />
            Todo-List
          </span>
        </nav>
      </div>
      <div className="login-container">
        {error && (
          <div class="alert alert-danger error" role="alert">
            {error} {/*display the error */}
          </div>
        )}
        <h3>Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            {/* register handling the onChange and value attributes automatically  */}
            <input
              type="text"
              className="form-control"
              id="firstName"
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              {...register("lastName")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", { required: true })}
            />
            <p id="error1" className="error"></p>
          </div>
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="form-control"
              id="password1"
              {...register("password", { required: true })}
            />
            <p id="error2" className="error"></p>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {loading === true ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className="pt-3">
          Already have any account ?{" "}
          <span className="highlight" onClick={() => navigate("/")}>
            {" "}
            login
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
