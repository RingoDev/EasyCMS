import throttle from "lodash.throttle";
import { useEffect, useState } from "react";

/**
 * React hook to keep the size of the current window up to date, runs on initial load and after every window resize
 * @param throttleMilliseconds the throttle in milliseconds, 100 by default
 */
export default function useWindowSize(throttleMilliseconds: number = 100) {
  const [size, setSize] = useState<[width: number, height: number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  const updateSize = throttle(
    () => setSize([window.innerWidth, window.innerHeight]),
    throttleMilliseconds,
  );

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    window.addEventListener("load", updateSize);
    return () => {
      window.removeEventListener("load", updateSize);
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);
  return size;
}
