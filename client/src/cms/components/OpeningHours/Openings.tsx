import React from "react";
import "../../pages/pages.css";
import "./Openings.css";
import Line from "../Line";
import { TimePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import { PlusButton } from "../Button/Button";

function Openings({ data, setData }) {
  return (
    <div className="Openings">
      <Line>
        <p>Überschrift Öffnungszeiten</p>
        <input
          id="input"
          value={data.openingHoursHeading}
          onChange={(e) =>
            setData({ ...data, openingHoursHeading: e.target.value })
          }
        />
      </Line>
      <Line>
        <p>Montag</p>
        <TimeSlots
          data={data.openingHours.monday}
          setData={(timeslots) =>
            setData({
              ...data,
              openingHours: { ...data.openingHours, monday: timeslots },
            })
          }
        />
      </Line>

      <Line>
        <p>Dienstag</p>
        <TimeSlots
          data={data.openingHours.tuesday}
          setData={(timeslots) =>
            setData({
              ...data,
              openingHours: { ...data.openingHours, tuesday: timeslots },
            })
          }
        />
      </Line>

      <Line>
        <p>Mittwoch</p>
        <TimeSlots
          data={data.openingHours.wednesday}
          setData={(timeslots) =>
            setData({
              ...data,
              openingHours: { ...data.openingHours, wednesday: timeslots },
            })
          }
        />
      </Line>

      <Line>
        <p>Donnerstag</p>
        <TimeSlots
          data={data.openingHours.thursday}
          setData={(timeslots) =>
            setData({
              ...data,
              openingHours: { ...data.openingHours, thursday: timeslots },
            })
          }
        />
      </Line>

      <Line>
        <p>Freitag</p>
        <TimeSlots
          data={data.openingHours.friday}
          setData={(timeslots) =>
            setData({
              ...data,
              openingHours: { ...data.openingHours, friday: timeslots },
            })
          }
        />
      </Line>

      <Line>
        <p>Samstag</p>
        <TimeSlots
          data={data.openingHours.saturday}
          setData={(timeslots) =>
            setData({
              ...data,
              openingHours: { ...data.openingHours, saturday: timeslots },
            })
          }
        />
      </Line>

      <Line>
        <p>Sonntag</p>
        <>
          <TimeSlots
            data={data.openingHours.sunday}
            setData={(timeslots) =>
              setData({
                ...data,
                openingHours: { ...data.openingHours, sunday: timeslots },
              })
            }
          />
          <PlusButton />
        </>
      </Line>
    </div>
  );
}

const TimeSlots = ({ data, setData }) => {
  const setTimeslotAtIndex = (x, index) => {
    const newData = data.slice();
    newData[index] = x;
    setData(newData);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {data.map((t, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", padding: "1rem", alignItems: "center" }}
            >
              <TimePicker
                minutesStep={15}
                ampm={false}
                value={
                  new Date(
                    2020,
                    0,
                    0,
                    t.start.split(":")[0],
                    t.start.split(":")[1],
                  )
                }
                views={["hours", "minutes"]}
                onChange={(e) => {
                  setTimeslotAtIndex(
                    {
                      start: format(e, "hh:mm"),
                      end: t.end,
                    },
                    index,
                  );
                }}
              />
              <div style={{ padding: "0 1rem" }} id="bis">
                bis
              </div>
              <TimePicker
                minutesStep={15}
                ampm={false}
                value={
                  new Date(2020, 0, 0, t.end.split(":")[0], t.end.split(":")[1])
                }
                views={["hours", "minutes"]}
                onChange={(e) => {
                  setTimeslotAtIndex(
                    {
                      start: t.start,
                      end: format(e, "hh:mm"),
                    },
                    index,
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Openings;
