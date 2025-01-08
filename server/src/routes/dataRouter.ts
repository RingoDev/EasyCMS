import express from "express";
import VesselController from "../services/VesselController";
import { Vessel } from "../types/types";
import { Roles } from "../types/roles";

const router = express.Router();

// get all vessels

// just a stub for developing
export const vessels = [
  "/home",
  "/location",
  "/rooms",
  "/partner",
  "/contact",
  "/cuisine",
];

router.get<undefined, Vessel[] | string>("/", (req, res) => {
  let preview = req.query.preview !== undefined;

  VesselController.getAllVessels(preview)
    .then((v) => res.send(v))
    .catch((_err) => {
      res.status(500).send();
    });
});

// respond with data of vessel that was asked for
router.get<undefined, Vessel>(creatRegexFromVessels(vessels), (req, res) => {
  let preview = req.query.preview !== undefined;

  console.log(
    "returning " + (preview ? "preview" : "published") + " data from database",
  );

  // we only get here when path matches a vessel exactly
  const vesselSlug = req.path;
  VesselController.getVessel(vesselSlug, preview)
    .then((v) => res.send(v))
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});

// first check permission
router.all<unknown, unknown, string, unknown, Record<string, Roles>>(
  "/",
  (req, res, next) => {
    // console.log("got request")
    const role = res.locals.role;
    console.log("somebody accessed the vessels endpoint");
    if (role < Roles.USER) {
      res.status(401).send("You are not authorized to access this resource");
      return;
    }
    next();
  },
);

// delete a vessel
router.delete<undefined, Vessel>(creatRegexFromVessels(vessels), (req, res) => {
  // we only get here when path matches a vessel exactly
  const vesselSlug = req.path;

  VesselController.deleteVessel(vesselSlug)
    .then((v) => res.send(v))
    .catch((e) => {
      console.log(e);
      res.status(500);
      res.send();
    });
});

router.put("/", (req, res) => {
  console.log("inserting multiple vessels ( Harbor )");

  const harbor = req.body;
  let preview = req.query.preview !== undefined;
  const x = Object.keys(harbor);
  const tasks: Promise<Vessel>[] = [];

  for (let i = 0; i < x.length; i++) {
    const vessel = {
      slug: "/" + x[i],
      name: x[i],
      data: harbor[x[i]],
    };
    tasks.push(VesselController.updateOrCreateVessel(vessel, preview));
  }

  Promise.all(tasks)
    .then((_) => {
      // console.log("Added or Updated Vessels", x)
      res.send("Added or Updated Vessels");
    })
    .catch((e) => {
      console.log(e);
      res.status(500);
      res.send();
    });
});

// update or create a vessel
router.put<undefined, Vessel, Vessel, any, Record<string, Roles>>(
  creatRegexFromVessels(vessels),
  (req, res) => {
    let preview = req.query.preview !== undefined;
    // console.log("whats happening")
    const vessel = {
      slug: req.path,
      name: req.path.replace("/", ""),
      data: req.body,
    };
    // console.log(vessel)
    VesselController.updateOrCreateVessel(vessel, preview)
      .then((v) => {
        res.send(v);
        // console.log("added vessel", v)
      })
      .catch((e) => {
        console.log(e);
        res.status(500);
        res.send();
      });
  },
);

export function creatRegexFromVessels(vessels: string[]) {
  let str = "(^";
  for (let i = 0; i < vessels.length; i++) {
    str += vessels[i];

    // we are on the last one
    if (i === vessels.length - 1) {
      str += "$)";
    } else {
      str += "$)|(^";
    }
  }
  return new RegExp(str);
}

export default router;
