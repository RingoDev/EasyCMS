import express from "express";
import VesselController from "../services/VesselController";
import { creatRegexFromVessels, vessels } from "./dataRouter";
import { Vessel } from "../types/types";

const router = express.Router();

// we allow access without verification in this router

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

export default router;
