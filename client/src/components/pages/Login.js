import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext/authContext";
import GuestContext from "../../context/guestContext/guestContext";
import { Link } from "react-router-dom";

export const Login = props => {
  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);
  const { clearGuests } = useContext(GuestContext);

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    clearError();
  };

  const submit = e => {
    e.preventDefault();
    loginUser({ email, password });
    clearError();
    clearGuests();
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
        />
        <input type="submit" value="Sign In" className="btn" />
      </form>
      <div className="question">
        {errors !== null && (
          <button className="danger">
            {errors.msg ? errors.msg : errors.error[0].msg}
            <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Don't an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
