import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const Connection=async()=>{
    const URL=`${process.env.MONGO_URL}/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true,})
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error on connecting", err);
    }
}