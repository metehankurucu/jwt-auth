import React, { useState, useContext } from "react";
import { UserContext } from "../provider/UserContext";
import { navigate } from "@reach/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await (
        await fetch("http://localhost:4000/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
      ).json();

      if (result.accessToken) {
        setUser({
          accessToken: result.accessToken,
        });
        navigate("/");
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div>Login</div>
        <div className="login-input">
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPasssword(e.currentTarget.value)}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
