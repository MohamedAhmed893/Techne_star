import mongoose from "mongoose";

const blogSchema =mongoose.Schema({
    title:{
        type:String ,
        trim:true ,
        required:true
    } ,
    description:{
        type:String ,
        trim:true ,
        required:true
    } ,
    imgCover:{
        type:String ,
        default:"default-avatar.png"
    } ,
    userId:{
        type:mongoose.Types.ObjectId ,
        ref:'user'
    }

},{timestamps:true})
blogSchema.post('init',(doc)=>{
    doc.imgCover ='https://techne-star.onrender.com/'+'blog/'+doc.imgCover
})



export const blogModel=mongoose.model('blog',blogSchema)