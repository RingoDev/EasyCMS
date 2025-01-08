import React, { useEffect, useState } from "react";
import useResizeHandle from "../hooks/useResizeHandle";
import useWindowSize from "../hooks/useWindowSize";

interface ResizableColumnsParams {
  width: number;
  dragging: boolean;
}

interface Props {
  children: ((params: ResizableColumnsParams) => React.ReactNode)[];
}

/**
 * Wrapper for 2 resizable columns that can be resized by a handle in the middle. On mobile screen only 1 of the columns is visible at all times
 * @param props
 */
const ResizableColumns = (props: Props) => {
  const handleBarWidth = 32;

  const [position, handleRef, containerRef, dragging] = useResizeHandle<
    HTMLDivElement,
    HTMLDivElement
  >(window.innerWidth / 2, 5, 5);

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

  if (width > 600)
    return (
      <div ref={containerRef} style={{ display: "flex", width: "100%" }}>
        <div style={{ ...styles, width: leftWidth }}>
          {/*{dragging ? <></> :props.children[0]({width: leftWidth, dragging})}*/}
          {props.children[0]({ width: leftWidth, dragging })}
        </div>

        <div ref={handleRef} style={handleStyles}>
          <div style={innerHandleStyles} />
        </div>
        <div
          style={{
            ...styles,
            width: rightWidth,
          }}
        >
          {props.children[1]({ width: rightWidth, dragging })}
        </div>
      </div>
    );
  return <OverlaidViews children={props.children} />;
};

const OverlaidViews: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          minHeight: "100%",
          alignItems: "center",
          backgroundColor: "#eeeeee",
        }}
      >
        <div
          style={{
            display: toggle ? "block" : "none",
            overflow: "hidden",
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <button
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
          </button>
          {props.children[0]({ width: window.innerWidth, dragging: false })}
        </div>

        <div
          style={{
            display: toggle ? "none" : "block",
            overflow: "hidden",
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <button
            style={{
              padding: "1rem",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? "Preview" : "Eingabe"}
          </button>
          {props.children[1]({ width: window.innerWidth, dragging: false })}
        </div>
      </div>
    </>
  );
};

export default ResizableColumns;
