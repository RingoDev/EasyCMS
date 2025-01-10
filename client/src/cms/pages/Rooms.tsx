import React from "react";
import Line from "../components/Line.tsx";
import Gallery from "../components/Gallery/gallery.tsx";
import { ComponentParams } from "./Wrapper.tsx";
import { RoomsType } from "../EasyCMS.tsx";

function Rooms({ data, setData }: ComponentParams<RoomsType>) {
  return (
    <div className="Zimmer">
      <div style={{ position: "relative" }}>
        <Line>
          <p>Überschrift Zimmer</p>
          <input
            value={data.headingRooms}
            onChange={(e) => setData({ ...data, headingRooms: e.target.value })}
          />
        </Line>
        <Line>
          <p>Text Zimmer</p>
          <textarea
            value={data.contentRooms}
            onChange={(e) => setData({ ...data, contentRooms: e.target.value })}
          />
        </Line>
        <Line>
          <p>Überschrift Preise</p>
          <input
            value={data.headingPrice}
            onChange={(e) => setData({ ...data, headingPrice: e.target.value })}
          />
        </Line>
        <Line>
          <p>Text Preise</p>
          <textarea
            value={data.prices}
            onChange={(e) => setData({ ...data, prices: e.target.value })}
          />
        </Line>
        <Line>
          <p>Gallerie</p>
          <Gallery
            slug={"/rooms"}
            images={data.images.map((img) => ({ ...img }))}
            setImages={(images) => setData({ ...data, images })}
          />
        </Line>
      </div>
    </div>
  );
}

export default Rooms;
