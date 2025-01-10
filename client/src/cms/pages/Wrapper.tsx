import { JSX, useEffect, useRef } from "react";
import { ComponentType } from "../EasyCMS";
import axios from "axios";
import "./pages.css";

export interface ComponentParams<T> {
  slug: string;
  data: T;
  setData: (data: T) => void;
}

interface Props<T> {
  slug: string;
  setPreview: (slug?: string) => void;
  setData: (data: T) => void;
  data: T;
  component: (props: ComponentParams<T>) => JSX.Element;
}

// keeps preview data up to date
function Wrapper<T extends ComponentType>({
  slug,
  data,
  setPreview,
  setData,
  component,
}: Props<T>) {
  const firstRender = useRef(false);

  // only runs when data is updated and not on initial render
  useEffect(() => {
    const saveData = (dataToSave: ComponentType) => {
      axios
        .put(
          import.meta.env.BACKEND_URL + "/api/vessel" + slug + "?preview=1",
          dataToSave,
        )
        .then(() => {
          console.log("Saving Preview data", dataToSave);
          setPreview();
        })
        .catch((e) => console.log("Speichern nicht möglich", e));
    };

    if (firstRender.current) {
      // console.log("Second render reload")
      const timeoutId = setTimeout(() => {
        // console.log(`I can see you're not typing. I can save the Contact preview now!`)
        saveData(data);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // console.log("First render")
      firstRender.current = true;
    }
  }, [data, setPreview, slug]);

  // set preview to current slug on first render only
  useEffect(() => {
    // console.log("First render reload")
    setPreview(slug);
  }, [setPreview, slug]);

  return component({ slug, data, setData });
}

export default Wrapper;
