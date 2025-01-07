import {FilledInput, FormControl, InputLabel} from "@material-ui/core";
import React from "react";
import {Entry, PDFProps} from "./bills";
import Controls from "./controls";
import MyDatePicker from "../../datePicker";


interface PDFInputProps {
    document: PDFProps
    setDocument: (doc: PDFProps) => void
    width: number
}

const PDFInputs: React.FC<PDFInputProps> = (props) => {

    const handleChange = (entries: Entry[]) => {
        props.setDocument({...props.document, entries})
    }

    return (
        <>
            <div style={{padding: "2rem"}}>
                <h2>Allgemein</h2>
                {/*<h4>Addressat</h4>*/}
                <div style={{display: "flex", flexDirection: "column"}}>
                    <FormControl variant={"filled"}>

                        <InputLabel htmlFor={"msg"}>{"Adressat"}</InputLabel>
                        <FilledInput rows={3} multiline id={"msg"} value={props.document.debtor}
                                     onChange={(e) => {
                                         props.setDocument({...props.document, debtor: e.target.value})
                                     }}/>
                    </FormControl>
                </div>
                <h4>Rechnungsdaten</h4>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <FormControl variant={"filled"}>
                        <InputLabel>Rechnngs-Nr</InputLabel>
                        <FilledInput value={props.document.invoiceNr} onChange={(e) => {
                            props.setDocument({...props.document, invoiceNr: e.target.value})
                        }}/>
                    </FormControl>
                    <MyDatePicker date={props.document.date} setDate={(date) => props.setDocument({...props.document, date})}/>
                    <FormControl variant={"filled"}>
                        <InputLabel>Betreff</InputLabel>
                        <FilledInput value={props.document.subject} onChange={(e) => {
                            props.setDocument({...props.document, subject: e.target.value})
                        }}
                        />
                    </FormControl>
                </div>
                <h2>Rechnungspositionen</h2>
                <Controls width={props.width} entries={props.document.entries} setEntries={handleChange}/>
            </div>

        </>
    )

}

export default PDFInputs

export const dateToString = (date: Date, reverse: boolean = false, delimiter: string = "-") => (
    reverse ?
        date.getDate().toString().padStart(2, "0") + delimiter +
        (date.getMonth() + 1).toString().padStart(2, "0") + delimiter +
        date.getFullYear() :

        date.getFullYear() + delimiter +
        (date.getMonth() + 1).toString().padStart(2, "0") + delimiter +
        date.getDate().toString().padStart(2, "0")
)