import React from "react";
import { Link } from "@reach/router";

const Navigation = ({ onLogout }) => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/protected">Protected</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
    <li>
      <button onClick={onLogout}>Log Out</button>
    </li>
  </ul>
);

export default Navigation;
