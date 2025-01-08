import mongoose, { Schema } from "mongoose";
import { IVessel } from "./Vessel";

const VesselSchema = new Schema<IVessel>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  data: { type: Object },
});

export default mongoose.model<IVessel>("VesselPreview", VesselSchema);
