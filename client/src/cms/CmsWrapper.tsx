import React, { useState } from "react";
import axios from "axios";
import Alert from "./components/Alert/Alert";
import WorkArea from "./WorkArea";
import styles from "./CmsWrapper.module.css";

interface Props {
  logout: () => void;
}

const CmsWrapper = ({ logout }: Props) => {
  const [alert, setAlert] = useState<{ text: string; cb: () => void }>();

  const handleLogout = () => {
    axios
      .get(import.meta.env.BACKEND_URL! + "/api/auth/logout")
      .then(() => logout());
  };

  return (
    <>
      <Alert alert={alert} close={() => setAlert(undefined)} />

      <div className={styles.container}>
        <WorkArea setAlert={setAlert} />
      </div>
    </>
  );
};

export default CmsWrapper;
