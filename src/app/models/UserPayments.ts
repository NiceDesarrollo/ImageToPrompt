import mongoose, { Document, Model } from "mongoose";

interface ITimestamp {
  createdAt: Date;
  updatedAt: Date;
}


export interface IUserPayment extends Document {
  userName: string;
  email: string;
  canGetThePrompt: boolean;
  timestamps: ITimestamp;
  // Add more fields as needed
}

const UserPaymentSchema = new mongoose.Schema<IUserPayment>(
  {
    userName: {
        type: String,
        required: [true, "Please provide an userName"],
      },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    canGetThePrompt: {
      type: Boolean,
      required: [true, "Please provide a password"],
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

const UserPayment: Model<IUserPayment> =
  mongoose.models.UserPayment || mongoose.model<IUserPayment>("UserPayment", UserPaymentSchema);

export default UserPayment;
