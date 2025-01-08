import React from "react";
import { useState } from "react";
import "./App.css";
import Login from "../Login";
import CmsWrapper from "./CmsWrapper";

const AuthWrapper = (props: React.PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(true);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn}></Login>;
  }
  return props.children;
};

export default AuthWrapper;
