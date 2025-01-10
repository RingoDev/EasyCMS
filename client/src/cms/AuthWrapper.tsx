import React, {ReactNode} from "react";
import { useState } from "react";
import "./AuthWrapper.css";
import Login from "../Login";
import axios from "axios";

const AuthWrapper = (props: { children: (v: () => void) => ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL! + "/api/auth/logout")
      .then(() => setLoggedIn(false));
  };
  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn}></Login>;
  }
  return props.children(handleLogout);
};

export default AuthWrapper;
