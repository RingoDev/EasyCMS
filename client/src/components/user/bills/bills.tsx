import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import BillDocument from "./bill-document";
import GetAppIcon from "@mui/icons-material/GetApp";
import printJS from "print-js";
import PrintIcon from "@mui/icons-material/Print";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PDFInputs from "./pdf-inputs";
import ResizableColumns from "../../resizableColumns";
import Preview from "./preview";
import "./bills.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export interface PDFProps {
  debtor: string;
  title: string;
  invoiceNr: string;
  date: Date;
  subject: string;
  entries: Entry[];
}

export interface Entry {
  date: Date;
  description: string;
  brutto: number;
  vat: number;
  amount: number;
}

const initialPDFProps: PDFProps = {
  debtor: "Max Muster" + "\n" + "Bodendorf 27" + "\n" + "4223 Katsdorf",
  title: "Rechnung",
  invoiceNr: "1234-567-89",
  date: new Date(Date.now()),
  subject: "Schüler in die Schule fahren",
  entries: [
    {
      date: new Date(Date.now()),
      description: "Beispielposition",
      brutto: 120,
      vat: 20,
      amount: 3,
    },
  ],
};

const Bills = () => {
  const [documentProps, setDocumentProps] = useState<PDFProps>(initialPDFProps);
  const [instance, update] = usePDF({
    document: <BillDocument {...documentProps} />,
  });

  // updates documentTitle 700 ms after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(`I can see you're not typing. I can update the pdf now!`);
      update(<BillDocument {...documentProps} />);
    }, 700);
    return () => clearTimeout(timeoutId);
    // eslint wants "update" as a dependency which would create an endless loop
    //eslint-disable-next-line
  }, [documentProps]);

  return (
    <>
      <div style={{ maxHeight: "100vh" }}>
        <div className={"navbar"}>
          {/*Back Button*/}
          <RouterLink style={{ height: "100%" }} to={"/"}>
            <Button style={{ padding: "1rem", height: "100%" }}>
              <ArrowBackIcon />
            </Button>
          </RouterLink>
          <div className={"controls"}>
            <a
              download={"rechnung.pdf"}
              href={instance.url === null ? undefined : instance.url}
            >
              <Button>
                <GetAppIcon />
              </Button>
            </a>
            {
              //  only show on desktop browsers, because printjs doesnt work with mobile so well
              detectMobile() ? null : (
                <Button
                  onClick={() =>
                    printJS(instance.url === null ? "" : instance.url)
                  }
                >
                  <PrintIcon />
                </Button>
              )
            }
          </div>
        </div>
        <div className={"container"}>
          <ResizableColumns>
            {[
              ({ width, dragging }) => (
                <PDFInputs
                  width={width}
                  document={documentProps}
                  setDocument={setDocumentProps}
                />
              ),
              ({ width, dragging }) => (
                <Preview instance={instance} width={width} />
              ),
            ]}
          </ResizableColumns>
        </div>
      </div>
    </>
  );
};

function detectMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

export default Bills;
