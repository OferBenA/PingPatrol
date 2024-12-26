import { Schema, model } from "mongoose";

const domainSchema = new Schema({
	domain: { type: String },
	id: { type: String },
	createdDate: { type: Date },
	isIpOrDns: { type: String },
	history: { type: [{ date: Date, status: String }] },
});

export const DomainModel = model("domainModel", domainSchema);
