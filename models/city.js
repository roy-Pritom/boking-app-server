import mongoose from "mongoose";
const CitySchema = new mongoose.Schema(
    {
        cityName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
     

    }

);

export default mongoose.model("City", CitySchema);