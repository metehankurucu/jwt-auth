import React, { useState } from "react";
import { navigate } from "@reach/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await (
        await fetch("http://localhost:4000/register", {
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

      if (result.result) {
        navigate("/login");
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
        <div>Register</div>
        <div className="login-input">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPasssword(e.target.value)}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
