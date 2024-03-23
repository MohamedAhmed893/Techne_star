import { blogModel } from "../../../database/models/blog.js";
import { commentModel } from "../../../database/models/comment.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import cloudinary from "../cloudinary/cloudinary.js";


const addBlog =catchAsyncError(async (req,res,next)=>{
    req.body.userId=req.user._id
    if(req.file){
        const result =await cloudinary.uploader.upload(req.file.path,
            {
                folder: 'uploads/blog',
                public_id: `${Date.now()}`, // Optional: specify a custom public_id
                resource_type: "auto"
            })

        req.body.imgCover =result.url
    }
   
    const blog =new blogModel(req.body)
    await blog.save()
    res.json({message:"success",blog})
})

const getAllBlog =catchAsyncError(async (req,res,next)=>{
    const blogs =await blogModel.find({})
    res.json({message:"success",blogs})
})

const getSpacificBlog =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const Blog =await blogModel.findById(id)
   !Blog && next(new AppError("Blog Not Found",403))
   Blog && res.json({message:"success",Blog})

})

const updateBlog=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    if(req.file){
        const result =await cloudinary.uploader.upload(req.file.path,
            {
                folder: 'uploads/blog',
                public_id: `${Date.now()}`, // Optional: specify a custom public_id
                resource_type: "auto"
            })
        req.body.imgCover =result.url
    }
    const Blog =await blogModel.findByIdAndUpdate(id,req.body,{new:true})
   !Blog && next(new AppError("Blog Not Found",403))
   Blog && res.json({message:"success",Blog})
})
const deleteBlog=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const Blog =await blogModel.findByIdAndDelete(id)
   !Blog && next(new AppError("Blog Not Found",403))
   Blog && res.json({message:"Blog Deleted"})
})

const getAllCommentsOfBlog =catchAsyncError(async (req,res,next)=>{
    const myComments =await commentModel.find({blog:req.params.blog})
    res.json({message:"success",myComments})
})
export {
    addBlog ,
    getAllBlog ,
    getSpacificBlog ,
    updateBlog ,
    deleteBlog ,
    getAllCommentsOfBlog
}