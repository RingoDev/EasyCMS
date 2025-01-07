import styles from "./datePicker.module.css";
import {DatePicker} from "@material-ui/pickers";
import React from "react";

interface Props {
    date: Date
    setDate: (date: Date) => void
}

const MyDatePicker: React.FC<Props> = (props) => {
    return (
        <DatePicker className={styles.datePicker} style={{
            backgroundColor: "#00000017",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px"
        }}
                    label={"Datum"}
                    format="dd/MM/yyyy"
                    value={props.date}
                    onChange={(v) => {
                        if (v !== null) {
                            props.setDate(new Date(v.getTime()));
                        }
                    }}/>
    )
}

export default MyDatePicker