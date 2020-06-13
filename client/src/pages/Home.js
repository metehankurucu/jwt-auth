import React, { useContext } from "react";
import { UserContext } from "../provider/UserContext";
import { Redirect } from "@reach/router";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  if (!user.accessToken) return <Redirect from="" to="login" noThrow />;
  return <div>Home page</div>;
};

export default Home;
