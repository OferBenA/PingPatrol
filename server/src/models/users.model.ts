import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userId: { type: String },
  createdDate: { type: Date },
  email: { type: String },
  userName: { type: String },
  password: { type: String },
  domains: {type: [String]}
});

export const UserModel = model('userModel', userSchema);
