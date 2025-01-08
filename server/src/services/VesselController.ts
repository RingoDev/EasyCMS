import VesselSchema from "../schemas/Vessel";
import VesselPreviewSchema from "../schemas/VesselPreview";
import { Vessel } from "../types/types";

export default class VesselController {
  static getAllVessels(preview?: boolean): Promise<Vessel[]> {
    if (preview) {
      return new Promise<Vessel[]>((resolve, reject) => {
        VesselPreviewSchema.find()
          .then((v) => resolve(v))
          .catch((e) => reject(e));
      });
    } else {
      return new Promise<Vessel[]>((resolve, reject) => {
        VesselSchema.find()
          .then((v) => resolve(v))
          .catch((e) => reject(e));
      });
    }
  }

  static getVessel(slug: string, preview?: boolean): Promise<Vessel> {
    if (preview) {
      return new Promise<Vessel>((resolve, reject) => {
        VesselPreviewSchema.findOne({ slug: slug })
          .then((v) => {
            if (v === null) reject();
            else resolve(v);
          })
          .catch((e) => reject(e));
      });
    } else {
      return new Promise<Vessel>((resolve, reject) => {
        VesselSchema.findOne({ slug: slug })
          .then((v) => {
            if (v === null) reject();
            else resolve(v);
          })
          .catch((e) => reject(e));
      });
    }
  }

  static deleteVessel(slug: string): Promise<Vessel> {
    return new Promise<Vessel>((resolve, reject) => {
      VesselSchema.findOneAndDelete({ slug: slug })
        .then((v) => {
          if (v === null) reject();
          else resolve(v);
        })
        .catch((e) => reject(e));
    });
  }

  static updateOrCreateVessel(
    vessel: Vessel,
    preview?: boolean,
  ): Promise<Vessel> {
    return new Promise<Vessel>((resolve, reject) => {
      // console.log("trying", vessel)
      // console.log(preview)
      if (preview) {
        VesselPreviewSchema.findOneAndUpdate({ slug: vessel.slug }, vessel, {
          new: true,
          upsert: true,
        })
          .then((v) => {
            // console.log(v)
            if (v === null) reject();
            else resolve(v);
          })
          .catch((e) => reject(e));
      } else {
        VesselSchema.findOneAndUpdate({ slug: vessel.slug }, vessel, {
          new: true,
          upsert: true,
        })
          .then((v) => {
            if (v === null) reject();
            else resolve(v);
          })
          .catch((e) => reject(e));
      }
    });
  }
}
