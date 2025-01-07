import React, { useEffect, useState } from "react";
import axios from "axios";
import { Vessel } from "../../types/types";

const CMS = () => {
  useEffect(() => {
    axios
      .get<Vessel[]>("http://localhost:5000/api/vessel")
      .then((r) => {
        console.log(r);
        setVessels(r.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const [vessels, setVessels] = useState<Vessel[]>([]);

  return (
    <>
      {vessels.map((v, index) => (
        <div key={index}>
          <div>{v.name}</div>
          <div>{v.slug}</div>
          <div>{v.children.map((x) => x.name)}</div>
        </div>
      ))}
    </>
  );
};

export default CMS;
