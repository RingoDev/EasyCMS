import React from "react";
import { Entry } from "./bills";
import styles from "./entry-input.module.css";
import { MinusButton } from "../../buttons";
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import MyDatePicker from "../../datePicker";

interface EntryInputProps {
  removeEntry: () => void;
  setEntry: (entry: Entry) => void;
  entry: Entry;
  width: number;
}

const SingleEntry: React.FC<EntryInputProps> = (props) => {
  return (
    <>
      <div
        className={
          styles.entry + " " + (props.width < 600 ? styles.narrowEntry : "")
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 1rem 0 0",
          }}
        >
          <MinusButton onClick={() => props.removeEntry()} />
        </div>
        <div className={styles.inputs}>
          <div className={styles.top}>
            <div className={styles.both}>
              <MyDatePicker
                date={props.entry.date}
                setDate={(date) => props.setEntry({ ...props.entry, date })}
              />
            </div>
            <div className={styles.both}>
              <FormControl variant={"filled"}>
                <InputLabel>Beschreibung</InputLabel>
                <FilledInput
                  value={props.entry.description}
                  onChange={(e) =>
                    props.setEntry({
                      ...props.entry,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
            </div>
            <div className={styles.both}>
              <FormControl variant={"filled"}>
                <InputLabel>Menge</InputLabel>
                <FilledInput
                  value={props.entry.amount}
                  onChange={(e) =>
                    props.setEntry({
                      ...props.entry,
                      amount: Number(e.target.value),
                    })
                  }
                  type={"number"}
                />
              </FormControl>
            </div>
            <div className={styles.both}>
              <FormControl variant={"filled"}>
                <InputLabel>Einzelpreis Netto</InputLabel>
                <FilledInput
                  value={
                    Math.round(
                      props.entry.brutto * (props.entry.vat / 100 + 1) * 100,
                    ) / 100
                  }
                  onChange={(e) =>
                    props.setEntry({
                      ...props.entry,
                      brutto:
                        Math.round(
                          (Number(e.target.value) /
                            (props.entry.vat / 100 + 1)) *
                            100,
                        ) / 100,
                    })
                  }
                  type={"number"}
                />
              </FormControl>
            </div>
            <div className={styles.both}>
              <FormControl variant={"filled"}>
                <InputLabel>Einzelpreis Brutto</InputLabel>
                <FilledInput
                  value={props.entry.brutto}
                  onChange={(e) =>
                    props.setEntry({
                      ...props.entry,
                      brutto: Number(e.target.value),
                    })
                  }
                  type={"number"}
                />
              </FormControl>
            </div>
            <div className={styles.both}>
              <FormControl variant="filled">
                <InputLabel>MwSt.</InputLabel>
                <Select
                  value={props.entry.vat}
                  onChange={(e) =>
                    props.setEntry({
                      ...props.entry,
                      vat: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value={0}>0%</MenuItem>
                  <MenuItem value={5}>5%</MenuItem>
                  <MenuItem value={10}>10%</MenuItem>
                  <MenuItem value={20}>20%</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEntry;
