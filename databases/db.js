import dotenv from "dotenv";
dotenv.config();


import mongoose from "mongoose";

export const Connection=async()=>{
    const URL=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ecomcluster.fnhso0c.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true,})
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error on connecting", err);
    }
}