import React, { useEffect, useRef, useState } from "react";
import "./EasyCMS.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import useWindowSize from "./hooks/useWindowSize";
import Wrapper from "./pages/Wrapper";
import { Snackbar } from "@mui/material";
import partnerData from "./data/partner.json";
import cuisineData from "./data/cuisine.json";
import homeData from "./data/home.json";
import contactData from "./data/contact.json";
import roomsData from "./data/rooms.json";
import locationData from "./data/location.json";
import styles from "./EasyCMS.module.css";
import pages from "./pages/pages.ts";

export interface Data {
  home: HomeType;
  cuisine: CuisineType;
  location: LocationType;
  rooms: RoomsType;
  partner: PartnerType;
  contact: ContactType;
}

export type HomeType = typeof homeData;
export type CuisineType = typeof cuisineData;
export type LocationType = typeof locationData;
export type RoomsType = typeof roomsData;
export type PartnerType = typeof partnerData;
export type ContactType = typeof contactData;
export type ComponentType =
  | HomeType
  | CuisineType
  | LocationType
  | RoomsType
  | PartnerType
  | ContactType;
export type VesselType = { slug: string; name: string; data: ComponentType };

interface Props {
  setAlert: (alert: { text: string; cb: () => void }) => void;
  thirdPartyCookies?: boolean;
  width?: number;
  reloadPreview: (slug?: string) => void;
  setShowPreview: (bool: boolean) => void;
  showPreview: boolean;
  dragging: boolean;
}

const EasyCMS: React.FC<Props> = ({ width, reloadPreview, dragging }) => {
  const [windowWidth] = useWindowSize();

  if (width === undefined) {
    width = windowWidth;
  }

  const [data, setData] = useState<Data>();

  useEffect(() => {
    axios
      .get<VesselType[]>(import.meta.env.VITE_BACKEND_URL! + "/api/vessel")
      .then((result) => {
        console.log(result);
        setData({
          contact: result.data.find((x) => x.slug === "/contact")
            ?.data as ContactType,
          cuisine: result.data.find((x) => x.slug === "/cuisine")
            ?.data as CuisineType,
          location: result.data.find((x) => x.slug === "/location")
            ?.data as LocationType,
          partner: result.data.find((x) => x.slug === "/partner")
            ?.data as PartnerType,
          rooms: result.data.find((x) => x.slug === "/rooms")
            ?.data as RoomsType,
          home: result.data.find((x) => x.slug === "/home")?.data as HomeType,
        });
      });

    // mockup backend

    // setData({
    //   home: homeData,
    //   cuisine: cuisineData,
    //   location: locationData,
    //   rooms: roomsData,
    //   partner: partnerData,
    //   contact: contactData,
    // });
  }, []);

  const containerRef = useRef(null);

  const save = () => {
    axios
      .put(import.meta.env.VITE_BACKEND_URL! + "/api/vessel", data)
      .then((r) => {
        console.log("Gespeichert", r.data);
        setSuccess(true);
      })
      .catch((e) => {
        console.log("Speichern nicht möglich", e);
        setFailure(true);
      });
  };

  // const activatePreview = () => {
  //
  //     // if third party cookies are enabled:
  //     if (thirdPartyCookies) {
  //         setShowPreview(!showPreview)
  //     } else {
  //         setAlert({
  //             text: "Third Party Cookies sind deaktiviert. Das Preview wird in einem neuen Tab geöffnet.",
  //             cb: () => {
  //                 const link = document.createElement("a")
  //                 link.target = "_blank"
  //                 link.href = clientURL + "/api/preview?secret=MY_SECRET_TOKEN&slug=/home"
  //                 link.click()
  //                 link.remove()
  //             }
  //         })
  //     }
  // }

  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);

  if (data === undefined) return <div>Laden...</div>;

  const handleClose = () => {
    setSuccess(false);
  };
  const handleCloseFailure = () => {
    setFailure(false);
  };
  return (
    <div
      ref={containerRef}
      className={width < 600 ? "mobile-container" : styles.container}
      style={dragging ? { display: "none" } : {}}
    >
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleClose}
        message={"Erfolgreich gespeichert"}
      />
      <Snackbar
        open={failure}
        autoHideDuration={5000}
        onClose={handleCloseFailure}
        message={"Speichern fehlgeschlagen"}
      />
      <Navbar width={width} />
      <div className={styles.inner}>
        <Routes>
          {pages.map((page) => (
            <Route
              key={page.slug}
              path={page.path}
              element={
                <Wrapper
                  component={page.element}
                  slug={page.slug}
                  setPreview={reloadPreview}
                  data={data[page.part]}
                  setData={(partial) =>
                    setData({ ...data, [page.part]: partial })
                  }
                />
              }
            />
          ))}
        </Routes>
      </div>

      <div className={styles.controls}>
        <button onClick={() => save()}>Speichern</button>
      </div>
    </div>
  );
};

export default EasyCMS;
