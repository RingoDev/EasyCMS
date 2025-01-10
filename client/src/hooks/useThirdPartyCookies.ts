import { useEffect, useState } from "react";

const useThirdPartyCookies = () => {
  const [thirdPartyCookies, setThirdPartyCookies] = useState<boolean>(false);

  useEffect(() => {
    console.log("creating iframe");
    const frame = document.createElement("iframe");
    frame.onload = () => console.log("frame loaded");
    frame.src = "https://ringodev.github.io/thirdPartyCookieCheck";
    frame.style.display = "none";
    // iframe needs to be appended to body or src isn't loaded who would've known
    document.body.appendChild(frame);
    const listen = (event: MessageEvent) => {
      console.log(event);
      if (event.data === "3pc.supported" || event.data === "3pc.unsupported") {
        const supported = event.data === "3pc.supported";
        window.removeEventListener("message", listen);
        frame.remove();
        setThirdPartyCookies(supported);
      }
    };
    window.addEventListener("message", listen);
    return () => window.removeEventListener("message", listen);
  }, []);
  return thirdPartyCookies;
};

export default useThirdPartyCookies;
