import React from "react";
import Bills from "../bills/bills/bills";
import { Route, Routes } from "react-router-dom";
import Landing from "./landing";
import CmsWrapper from "../cms/CmsWrapper";

const NavPanel = ({ logout }: { logout: () => void }) => {
  return (
    <>
      <div className={"logout"}>
        <button onClick={logout} className={"logoutButton"}>
          <img alt="Logout" src={"/logout.svg"} />
        </button>
      </div>
      <Routes>
        <Route path={"/cms/*"} element={<CmsWrapper />} />
        <Route path={"/bills/"} element={<Bills />} />
        <Route path={"/"} element={<Landing />} />
      </Routes>
    </>
  );
};

export default NavPanel;
