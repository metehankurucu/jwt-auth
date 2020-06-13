import React, { useContext, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./pages/Protected";
import Home from "./pages/Home";
import { UserContext } from "./provider/UserContext";

function App() {
  const [user, setUser] = useContext(UserContext);
  console.log(user);

  const onLogout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include", // Needed to include the cookie
    });
    setUser({});
    navigate("/");
  };

  useEffect(() => {
    const checkRefreshToken = async () => {
      const result = await (
        await fetch("http://localhost:4000/refreshToken", {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setUser({
        accessToken: result.accessToken,
      });
    };
    checkRefreshToken();
  }, []);

  return (
    <div className="app">
      <Navigation onLogout={onLogout} />
      <Router id="router">
        <Login path="login" />
        <Register path="register" />
        <Protected path="protected" />
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
