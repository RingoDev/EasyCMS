import Contact from "./Contact.tsx";
import Location from "./Location.tsx";
import Cuisine from "./Cuisine.tsx";
import { ComponentParams } from "./Wrapper.tsx";
import Home from "./Home.tsx";
import { JSX } from "react";
import { ComponentType, Data } from "../EasyCMS.tsx";
import Rooms from "./Rooms.tsx";
import Partner from "./Partner.tsx";

interface Page {
  element: (props: ComponentParams<any>) => JSX.Element;
  part: keyof Data;
  slug: string;
  title: string;
  path: string;
}

const pages: Page[] = [
  {
    element: Home,
    slug: "/home",
    part: "home",
    title: "Home",
    path: "/",
  },

  {
    element: Location,
    slug: "/location",
    part: "location",
    title: "Location",
    path: "/location",
  },
  {
    element: Cuisine,
    slug: "/cuisine",
    part: "cuisine",
    title: "Cuisine",
    path: "/cuisine",
  },
  {
    element: Rooms,
    slug: "/rooms",
    part: "rooms",
    title: "Rooms",
    path: "/rooms",
  },
  {
    element: Partner,
    slug: "/partner",
    part: "partner",
    title: "Partner",
    path: "/partner",
  },
  {
    element: Contact,
    slug: "/contact",
    part: "contact",
    title: "Contact",
    path: "/contact",
  },
];

export default pages;
