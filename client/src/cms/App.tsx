import React from "react";
import { useState } from "react";
import "./App.css";
import Login from "../Login";
import CmsWrapper from "./CmsWrapper";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <div className="background">
        <img alt="Background" src={"/background.jpg"} />
      </div>
      {loggedIn ? (
        <CmsWrapper logout={() => setLoggedIn(false)} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
