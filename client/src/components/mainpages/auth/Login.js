import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/user/login", { ...user });
      window.location.href = "/";

      localStorage.setItem('firstLogin', true)
      
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          autoComplete="on"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="login__button">
          <button type="submit">Login</button>
          <Link to={"/register"}>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
