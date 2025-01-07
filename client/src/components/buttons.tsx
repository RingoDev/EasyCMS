import React, { CSSProperties } from "react";
import styles from "./buttons.module.css";

export const MinusButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  const style: CSSProperties = {
    strokeWidth: 4,
    stroke: "currentColor",
    strokeLinecap: "round",
    fill: "none",
    strokeLinejoin: "round",
  };
  return (
    <button className={styles.minusButton} {...props}>
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

export const PlusButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button className={styles.plusButton} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{
          strokeWidth: 4,
          stroke: "currentColor",
          strokeLinecap: "round",
          fill: "none",
          strokeLinejoin: "round",
        }}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
};
