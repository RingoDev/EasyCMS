import styles from "./button.module.css";
import React, { ButtonHTMLAttributes, CSSProperties } from "react";

export const MinusButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const style: CSSProperties = {
    strokeWidth: 4,
    stroke: "currentColor",
    strokeLinecap: "round",
    fill: "none",
    strokeLinejoin: "round",
  };

  return (
    <button onClick={props.onClick} className={styles.minus}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={style}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
};

export const PlusButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const style: CSSProperties = {
    strokeWidth: 4,
    stroke: "currentColor",
    strokeLinecap: "round",
    fill: "none",
    strokeLinejoin: "round",
  };
  return (
    <button onClick={props.onClick} className={styles.plus}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={style}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
};
