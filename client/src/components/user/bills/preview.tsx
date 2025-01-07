import { Document, Page, pdfjs } from "react-pdf";
import React, { useMemo, useState } from "react";
import { UsePDFInstance } from "@react-pdf/renderer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Preview: React.FC<{
  instance: UsePDFInstance;
  width: number;
}> = ({ instance, width }) => {
  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "#eeeeee",
          height: "100%",
        }}
      >
        <div className={"pdf"}>
          <PDFViewer file={instance.blob} width={width} />
        </div>
      </div>
    </>
  );
};

export default Preview;

const PDFViewer: React.FC<{ file: any; width: number }> = (props) => {
  const [numPages, setNumPages] = useState<number>(0);

  return useMemo(
    () => (
      <>
        <Document
          className={"react-pdf"}
          renderMode={"svg"}
          onLoadError={(e) => console.log(e)}
          file={props.file}
          onLoadSuccess={(x) => {
            setNumPages(x.numPages);
          }}
          loading={"Loading"}
        >
          <div
            style={{
              backgroundColor: "#eeeeee",
            }}
          >
            {Array.from({ length: numPages }).map((x, index) => {
              return (
                <div
                  key={index}
                  style={{
                    boxShadow: "0 25px 50px 0 rgb(62 62 62 / 15%)",
                    margin: "2rem 0",
                    backgroundColor: "#eeeeee",
                  }}
                >
                  <Page width={props.width * 0.8} pageNumber={index + 1} />
                </div>
              );
            })}
          </div>
        </Document>
      </>
    ),
    [numPages, props],
  );
};
