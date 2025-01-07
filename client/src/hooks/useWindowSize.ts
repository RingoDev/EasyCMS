import throttle from "lodash.throttle";
import { useEffect, useState } from "react";

export default function useWindowSize(throttleMilliseconds: number = 100) {
  const [size, setSize] = useState<[width: number, height: number]>([0, 0]);

  const updateSize = throttle(
    () => setSize([window.innerWidth, window.innerHeight]),
    throttleMilliseconds,
  );

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);
  return size;
}
