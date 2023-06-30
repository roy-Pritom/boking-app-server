import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }

    }

);

export default mongoose.model("Payment", PaymentSchema);