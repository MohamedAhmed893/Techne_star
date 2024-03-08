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
    doc.imgCover ='http://localhost:5002/'+'blog/'+doc.imgCover
})

  blogSchema.virtual('myComments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'blog'
  });
  blogSchema.pre(/^find/,function (next){
    this.populate('myComments')
    next()
  })

export const blogModel=mongoose.model('blog',blogSchema)