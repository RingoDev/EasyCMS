import React from "react";

const Alert = ({
  alert,
  close,
}: {
  alert?: { text: string; cb: () => void };
  close: () => void;
}) => (
  <>
    {alert !== undefined ? (
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#00000077",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#cccccc",
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            borderRadius: "0.75rem",
            maxWidth: "50ch",
          }}
        >
          <p>{alert.text}</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button onClick={close}>Zurück</button>
            <button onClick={alert.cb}>OK</button>
          </div>
        </div>
      </div>
    ) : null}
  </>
);

export default Alert;
