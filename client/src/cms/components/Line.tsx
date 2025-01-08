import React from "react";

interface Props {
  inset?: number;
}

/**
 * represents a line in the design, which is split by a vertical decorator
 * @param props an inset can be specified as an integer which insets the right component
 * @returns {JSX.Element} the react element
 * @constructor
 */
const Line: React.FC<Props & React.PropsWithChildren> = (props) => {
  const inset = props.inset ?? 0;
  const styles = {
    flex: "0 1 " + (70 - inset * 3) + "%",
  };

  return (
    <div className="line">
      {React.Children.count(props.children) === 2 ? (
        <>
          <div className={"lineDescription"}>
            {React.Children.toArray(props.children)[0]}
          </div>
          <div style={styles} className={"lineContent"}>
            {React.Children.toArray(props.children)[1]}
          </div>
        </>
      ) : (
        <>
          <div className={"lineDescription"} />
          <div style={styles} className={"lineContent"}>
            {React.Children.toArray(props.children)[0]}
          </div>
        </>
      )}
    </div>
  );
};
export default Line;
