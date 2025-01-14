import { Schema, model } from "mongoose";

const domainSchema = new Schema({
	ipAddr: { type: String },
	id: { type: String },
	createdDate: { type: Date },
	history: { type: [{ alive: Boolean ,startCurrentStatus: Number,endCurrentStatus: Number }] },
});

export const DomainModel = model("domainModel", domainSchema);
