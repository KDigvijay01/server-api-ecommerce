
import mongoose from "mongoose";
import * as KEYS from "../config/keys.js"


export const Connection=async()=>{
    console.log("keys", KEYS.default.default.USERNAME)
    const URL=`mongodb+srv://${KEYS.default.default.USERNAME}:${KEYS.default.default.PASSWORD}@ecomcluster.fnhso0c.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error on connecting", err);
    }
}