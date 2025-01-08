import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

interface Props {
  setLoggedIn: (val: boolean) => void;
}

function Login(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_BACKEND_URL! + "/api/auth/login", {
        email: username,
        password: password,
      })
      .then((r) => {
        console.log("Logged user " + r.data.user.email + " in");
        props.setLoggedIn(true);
        setPassword("")
      })
      .catch((e) => console.log(e));
  };

  return (
    <form className={"Login"} onSubmit={login}>
      <p>Login</p>

      <input
        placeholder={"Benutzername"}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br />
      <input
        type={"Password"}
        placeholder={"Passwort"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />

      <button type={"submit"}>Einloggen</button>
    </form>
  );
}

export default Login;
