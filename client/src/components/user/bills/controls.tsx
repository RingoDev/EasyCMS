import React from "react";
import {Entry} from "./bills";
import SingleEntry from "./singleEntry";
import {PlusButton} from "../../buttons";

interface EntriesInputProps {
    entries: Entry[]
    setEntries: (doc: Entry[]) => void
    width: number
}

const Controls: React.FC<EntriesInputProps> = (props) => {

    const handleChange = (entry: Entry, index: number) => {
        const newEntries = props.entries.map((oldEntry, i) => {
            if (i === index) {
                return entry
            }
            return oldEntry
        })
        props.setEntries(newEntries)
    }

    const addEntry = () => {
        const newEntries = props.entries.slice()
        newEntries.push({date: new Date(Date.now()), description: "", brutto: 0, vat: 0, amount: 0})
        props.setEntries(newEntries)
    }

    const removeEntry = (index: number) => {
        const newEntries = props.entries.slice()
        newEntries.splice(index, 1)
        props.setEntries(newEntries)
    }

    return (
        <>
            <div style={{padding: "1rem 0"}}>
                {props.entries.map((e, index) => (
                    <SingleEntry width={props.width} key={index} setEntry={(entry) => handleChange(entry, index)} entry={e}
                           removeEntry={() => removeEntry(index)}/>
                ))}
                <div style={{display: "flex", justifyContent: "center", paddingTop: "0.5rem"}}>
                    <PlusButton onClick={addEntry}/>
                </div>
            </div>
        </>
    )
}

export default Controls