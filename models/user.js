import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
     

    }

);

export default mongoose.model("User", UserSchema);