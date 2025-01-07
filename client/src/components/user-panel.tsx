import React from "react";
import Bills from "./user/bills/bills";
import CMS from "./user/cms";
import { Route, Routes } from "react-router-dom";
import Landing from "./user/landing";

const UserPanel = () => {
  return (
    <>
      <Routes>
        <Route path={"/cms"} element={<CMS />}></Route>

        <Route path={"/"} element={<Landing />}></Route>

        <Route path={"/bills"} element={<Bills />}></Route>
      </Routes>
    </>
  );
};

export default UserPanel;
