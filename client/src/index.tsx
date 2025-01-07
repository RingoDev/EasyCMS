import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { LocalizationProvider } from "@mui/lab";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider locale="de">
      <App />
    </LocalizationProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root"),
);
