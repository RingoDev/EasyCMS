import mongoose, { Schema, Document } from "mongoose";
import { Vessel } from "../types/types";

export interface IVessel extends Document, Vessel {}

const VesselSchema = new Schema<IVessel>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  data: { type: Object },
});

export default mongoose.model<IVessel>("Vessel", VesselSchema);
