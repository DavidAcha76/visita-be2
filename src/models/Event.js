import mongoose from "mongoose";
import { addCommon, point2D } from "./common.js";

const schema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  location: { type: point2D, index: "2dsphere" }
}, { versionKey: false });

addCommon(schema);
schema.index({ "name.es": "text", "name.en": "text", "description.es": "text", "description.en": "text", tags: "text" });

export const Event = mongoose.model("Event", schema, "announcements"); // si tus eventos están en "announcements" cámbialo; si tienes ambos, mantén ambos modelos
