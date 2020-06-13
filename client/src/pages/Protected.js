import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../provider/UserContext";

const Protected = () => {
  const [user] = useContext(UserContext);
  const [content, setContent] = useState("You need to login");

  useEffect(() => {
    async function fetchProtected() {
      const result = await (
        await fetch("http://localhost:4000/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
        })
      ).json();
      if (result.message) setContent(result.message);
    }
    fetchProtected();
  }, [user]);

  return <div>{content}</div>;
};

export default Protected;
