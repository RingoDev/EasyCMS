import React, { useState } from "react";
import Alert from "./components/Alert/alert.tsx";
import WorkArea from "./WorkArea";
import styles from "./CmsWrapper.module.css";

const CmsWrapper = () => {
  const [alert, setAlert] = useState<{ text: string; cb: () => void }>();

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
