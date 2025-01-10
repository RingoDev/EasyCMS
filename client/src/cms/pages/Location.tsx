import React from "react";
import Line from "../components/Line.tsx";
import Gallery from "../components/Gallery/gallery.tsx";
import { ComponentParams } from "./Wrapper.tsx";
import { LocationType } from "../EasyCMS.tsx";

function Location({ data, setData }: ComponentParams<LocationType>) {
  return (
    <div className="Lokal">
      <div style={{ position: "relative" }}>
        {data.locations.map((location, index) => {
          const setLocation = (newLocation: LocationType["locations"][0]) => {
            const newLocations = data.locations.slice();
            newLocations[index] = newLocation;
            setData({ ...data, locations: newLocations });
          };
          return (
            <div key={index}>
              <Line>
                <p>Überschrift</p>
                <input
                  value={location.heading}
                  onChange={(e) =>
                    setLocation({ ...location, heading: e.target.value })
                  }
                />
              </Line>
              <Line inset={1}>
                <p>Text</p>
                <textarea
                  value={location.content}
                  onChange={(e) =>
                    setLocation({ ...location, content: e.target.value })
                  }
                />
              </Line>
              <Line inset={1}>
                <p>Gallerie</p>
                <Gallery
                  slug={"/location"}
                  images={location.images.map((img) => ({
                    ...img,
                  }))}
                  setImages={(images) => setLocation({ ...location, images })}
                />
              </Line>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Location;
