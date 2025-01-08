import React from "react";
import Bills from "../bills/bills/bills";
import { Route, Routes } from "react-router-dom";
import Landing from "./landing";
import CmsWrapper from "../cms/CmsWrapper";

const NavPanel = () => {
  return (
    <>
      <div className={"logout"}>
        <button onClick={() => console.error("TODO implement logout")} className={"logoutButton"}>
          <img alt="Logout" src={"/Logout-Symbol.svg"} />
        </button>
      </div>
      <Routes>
        <Route path={"/cms/*"} element={<CmsWrapper logout={() => {}} />} />
        <Route path={"/bills/"} element={<Bills />} />
        <Route path={"/"} element={<Landing />} />
      </Routes>
    </>
  );
};

export default NavPanel;
