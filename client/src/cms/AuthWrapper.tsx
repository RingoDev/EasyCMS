import React from "react";
import { useState } from "react";
import "./AuthWrapper.css";
import Login from "../Login";

const AuthWrapper = (props: React.PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn}></Login>;
  }
  return props.children;
};

export default AuthWrapper;
