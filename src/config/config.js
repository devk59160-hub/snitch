import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

if(!process.env.JWT_TOKEN){
    throw new Error("could not find jwt-token in environment variables");
}

if(!process.env.IMAGE_KIT){
    throw new Error("could not find image-kit in enviromnment variables");
}

export const Config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_TOKEN: process.env.JWT_TOKEN,
    IMAGE_KIT: process.env.IMAGE_KIT
};





