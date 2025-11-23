import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export const UserModel = model('User', UserSchema)
export default UserModel
