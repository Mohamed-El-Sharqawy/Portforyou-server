import mongoose, { Schema, Document } from "mongoose";
import { IArik, ArikSchema } from "../../models/Arik";
import { SubscriptionType } from "../../lib/constants";

export interface IUser extends Document {
  email: string;
  username: string;
  arikTemplate: IArik;
  selectedTemplates: string[];
  subscription: SubscriptionType;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
};

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    selectedTemplates: [
      {
        type: String,
        default: [],
      },
    ],
    subscription: {
      type: String,
      enum: Object.values(SubscriptionType),
      default: SubscriptionType.TRIAL,
    },
    arikTemplate: ArikSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
