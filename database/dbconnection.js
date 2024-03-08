import mongoose from "mongoose";

export const dbconnection =()=>{
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log("database connected .");
    }).catch(()=>{
        console.log("error in connect .");
    })
}