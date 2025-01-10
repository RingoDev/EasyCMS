import EasyCMS from "./EasyCMS";
import Preview from "./components/Preview/preview";
import React, { useRef, useState } from "react";
import useThirdPartyCookies from "../hooks/useThirdPartyCookies.ts";
import ResizableColumns from "../shared/resizableColumns.tsx";

const clientURL = import.meta.env.VITE_STEFFLWIRT_URL!;

interface Props {
  setAlert: (alert: { text: string; cb: () => void }) => void;
}

const WorkArea = ({ setAlert }: Props) => {
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const thirdPartyCookies = useThirdPartyCookies();
  const previewRef = useRef<HTMLIFrameElement>(null);

  /**
   * function to call if we want to reload the preview
   * @param slug if slug is not defined, the current URL is reloaded otherwise the specified slug is loaded
   */
  const reloadPreview = (slug?: string) => {
    const preview = previewRef.current;
    if (preview !== null) {
      if (slug === undefined) {
        // just reload the frame with the current url
        if (preview.contentDocument !== null) {
          preview.contentDocument.location.reload();
        } else {
          // we don't have same origin we have to hard reset iframe
          preview.src += "";
        }
      } else {
        if (preview.contentDocument !== null) {
          if (
            preview.src !==
            clientURL + "/api/preview?secret=MY_SECRET_TOKEN&slug=" + slug
          )
            preview.src =
              clientURL + "/api/preview?secret=MY_SECRET_TOKEN&slug=" + slug;
        } else {
          // we don't have same origin we have to hard reset iframe
          if (
            preview.src !==
            clientURL + "/api/preview?secret=MY_SECRET_TOKEN&slug=" + slug
          )
            preview.src =
              clientURL + "/api/preview?secret=MY_SECRET_TOKEN&slug=" + slug;
        }
      }
    }
  };

  if (showPreview) {
    return (
      <ResizableColumns>
        {[
          ({ width, dragging }) => (
            <EasyCMS
              dragging={dragging}
              setAlert={setAlert}
              thirdPartyCookies={thirdPartyCookies}
              reloadPreview={reloadPreview}
              showPreview={showPreview}
              setShowPreview={setShowPreview}
              width={width}
            />
          ),
          ({ width }) => (
            <Preview
              previewRef={previewRef}
              width={width}
              previewURL={
                clientURL + "/api/preview?secret=MY_SECRET_TOKEN&slug=/home"
              }
            />
          ),
        ]}
      </ResizableColumns>
    );
  } else
    return (
      <>
        <EasyCMS
          dragging={false}
          setAlert={setAlert}
          thirdPartyCookies={thirdPartyCookies}
          reloadPreview={reloadPreview}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      </>
    );
};
export default WorkArea;
