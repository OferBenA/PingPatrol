import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userId: { type: String },
  createdDate: { type: Date },
  email: { type: String },
  userName: { type: String },
  password: { type: String },
  domains: {type: [{
    ipOrDns: String,
    isFavorite: Boolean,
    name: String,
    domainId: String,
    lastUpdate: {alive: Boolean, startCurrentStatus: Number,endCurrentStatus: Number }
  }]}
});

export const UserModel = model('userModel', userSchema);
