import React from "react";
import styles from "./preview.module.css";

interface Props {
  width: number;
  previewURL: string;
  previewRef: React.Ref<HTMLIFrameElement>;
}

/**
 *
 * @param width the current width of the iframe, is used to resize the iframe document accordingly
 * @param previewURL the preview URL of the iframe, todo remove preview url because we can set it on the ref directly?
 * @param previewRef the ref to the iframe
 * @constructor
 */
const Preview: React.FC<Props> = ({ width, previewURL, previewRef }) => {
  return (
    <>
      <iframe
        ref={previewRef}
        title={"preview"}
        height={"100%"}
        width={width}
        className={styles.frame}
        src={previewURL}
      />
    </>
  );
};

export default Preview;
