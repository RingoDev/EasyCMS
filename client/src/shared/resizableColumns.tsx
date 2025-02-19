import React, { useEffect, useState } from "react";
import useResizeHandle from "../hooks/useResizeHandle";
import useWindowSize from "../hooks/useWindowSize";
import { Button } from "@mui/material";

interface ResizableColumnsParams {
  width: number;
  dragging: boolean;
}

interface Props {
  children: ((params: ResizableColumnsParams) => React.ReactNode)[];
}

const ResizableColumns = (props: Props) => {
  const handleBarWidth = 32;

  const [position, handleRef, containerRef, dragging] = useResizeHandle<
    HTMLDivElement,
    HTMLDivElement
  >(window.innerWidth * 0.5, 5, 5);

  const [leftBorder, setLeftBorder] = useState(0);
  const [rightBorder, setRightBorder] = useState(window.innerWidth);

  const [width, height] = useWindowSize();

  useEffect(() => {
    // setting left and right border of container after render and whenever the window is resized
    setLeftBorder(containerRef.current?.getBoundingClientRect().left ?? 0);
    setRightBorder(
      containerRef.current?.getBoundingClientRect().right ?? window.innerWidth,
    );
  }, [width, height, containerRef]);

  const styles: React.CSSProperties = {
    overflow: "hidden",
    width: "100%",
    // set columns pointer events to none so our dragging is not disturbed
    pointerEvents: dragging ? "none" : "unset",
    borderRadius: "0.75rem",
  };

  const handleStyles: React.CSSProperties = {
    height: "100%",
    cursor: "col-resize",
    flex: "0 0 32px",
  };

  const innerHandleStyles: React.CSSProperties = {
    height: "100%",
    cursor: "col-resize",
    borderRadius: "10px",
    width: "16px",
    backgroundColor: "#c9c9c9",
    margin: "0 auto",
    pointerEvents: "none",
  };

  const leftWidth = Math.max(position - leftBorder - handleBarWidth / 2, 0);
  const rightWidth = Math.max(rightBorder - position - handleBarWidth / 2, 0);

  if (window.innerWidth > 600)
    return (
      <div ref={containerRef} style={{ display: "flex", width: "100%" }}>
        <div style={{ ...styles, width: leftWidth }}>
          {props.children[0]({ width: leftWidth, dragging })}
        </div>
        <div ref={handleRef} style={handleStyles}>
          <div style={innerHandleStyles} />
        </div>
        <div style={{ ...styles, width: rightWidth }}>
          {props.children[1]({ width: rightWidth, dragging })}
        </div>
      </div>
    );
  // eslint-disable-next-line
  return <OverlaidViews children={props.children} />;
};

const OverlaidViews: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          alignItems: "center",
          backgroundColor: "#eeeeee",
        }}
      >
        <Button
          style={{
            padding: "1rem",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          }}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "Preview" : "Eingabe"}
        </Button>

        <div style={{ display: toggle ? "block" : "none" }}>
          {props.children[0]({ width: window.innerWidth, dragging: false })}
        </div>
        <div style={{ display: toggle ? "none" : "block" }}>
          {props.children[1]({ width: window.innerWidth, dragging: false })}
        </div>
      </div>
    </>
  );
};

export default ResizableColumns;
