import { Schema, model } from "mongoose";


const domainSchema = new Schema({
  domain: {type: String},
  id: { type: String },
  createdDate: { type: Date },
  name: { type: String },
  isFavorite: { type: Boolean },
  isIpOrDns: { type: String },
});

export const DomainModel = model('domainModel', domainSchema);
