import React from "react";
import Line from "../components/Line.tsx";
import { ComponentParams } from "./Wrapper.tsx";
import { ContactType } from "../EasyCMS.tsx";

function Contact({ data, setData }: ComponentParams<ContactType>) {
  return (
    <div className="Kontakt">
      <div style={{ position: "relative" }}>
        <Line>
          <p>Überschrift Kontakt</p>
          <input
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
          />
        </Line>
        <Line>
          <p>Name</p>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </Line>
        <Line>
          <p>Adresse</p>
          <input
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </Line>
        <Line>
          <p>Telefon</p>
          <input
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </Line>
        <Line>
          <p>E-Mail</p>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Line>

        <Line>
          <p>Text</p>
          <textarea
            value={data.text}
            onChange={(e) => setData({ ...data, text: e.target.value })}
          />
        </Line>
      </div>
    </div>
  );
}

export default Contact;
