import connectMongo from "../connectMongo";
import mongoose from "mongoose";
import User from "../../models/User";

export async function createUserIfNotExists(req) {
    try {
        await connectMongo();
        req.googleId = req.id;
        req._id = new mongoose.Types.ObjectId();
        const user = await User.create(req);
    } catch (error) {
        console.log(error, req);
    }
}