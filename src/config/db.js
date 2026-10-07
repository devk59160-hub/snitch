import mongoosedb from "mongoose";
import {Config} from "./config.js";

const ConnectionDB = async () => {
    try {
        await mongoosedb.connect(Config.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

export default ConnectionDB;