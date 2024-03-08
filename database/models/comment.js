import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    comment:{
        type:String ,
        trim:true 
    } ,
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'user' ,
        required:true
    } ,
    blog:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'blog' ,
        required:true
    }
},{timestamps:true})


export const commentModel=mongoose.model('comment',commentSchema)