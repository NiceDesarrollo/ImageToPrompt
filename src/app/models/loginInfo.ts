import mongoose, { Document, Model } from "mongoose";

interface ITimestamp {
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginInfo extends Document {
  name: string;
  email: string;
  provider: string;
  timestamps: ITimestamp;
  // Add more fields as needed
}

const LoginInfoSchema = new mongoose.Schema<ILoginInfo>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    provider: {
      type: String,
      required: [true, "Please give a provider"],
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

const LoginInfo: Model<ILoginInfo> =
  mongoose.models.LoginInfo ||
  mongoose.model<ILoginInfo>("LoginInfo", LoginInfoSchema);

export default LoginInfo;
