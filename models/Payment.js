import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const paymentSchema = new Schema(
    {
        name: { type: String, required: true },
        to_user: { type: String, required: true },
        oid: { type: String, required: true },
        message: { type: String },
        amount: { type: Number, required: true },
        done: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

const Payment = models?.Payment || mongoose.model("Payment", paymentSchema);

export default Payment