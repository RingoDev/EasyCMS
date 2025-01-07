import { Button } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./landing.css";

const Landing: React.FC = () => {
  return (
    <>
      <div className={"containerL"} style={{ display: "flex" }}>
        <RouterLink to={"/cms"}>
          <Button className={"button"}>Website</Button>
        </RouterLink>
        <RouterLink to={"/bills"}>
          <Button className={"button"}>Rechnungen</Button>
        </RouterLink>
      </div>
    </>
  );
};

export default Landing;
