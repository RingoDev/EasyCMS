import styles from "./datePicker.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const MyDatePicker: React.FC<Props> = (props) => {
  return (
    <DatePicker
      className={styles.datePicker}
      label={"Datum"}
      format="dd/MM/yyyy"
      value={props.date}
      onChange={(v: any) => {
        if (v !== null) {
          props.setDate(new Date(v.getTime()));
        }
      }}
    />
  );
};

export default MyDatePicker;
