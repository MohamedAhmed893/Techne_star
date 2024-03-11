import { commentModel } from "../../../database/models/comment.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"




const addComment =catchAsyncError(async (req,res,next)=>{
    req.body.userId=req.user._id
    const comment =new commentModel(req.body)
    await comment.save()
    res.json({message:"success",comment})
})


const getSpacificComment =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const Comment =await commentModel.findById(id)
   !Comment && next(new AppError("Comment Not Found",403))
   Comment && res.json({message:"success",Comment})

})

const updateComment=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const Comment =await commentModel.findOneAndUpdate({_id:id,userId:req.user._id},{comment:req.body.comment},{new:true})
   !Comment && next(new AppError("Your are not Authourizied To Update in Comment",403))
   Comment && res.json({message:"success",Comment})
})
const deleteComment=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const Comment =await commentModel.findOneAndDelete({_id:id,userId:req.user._id})
   !Comment && next(new AppError("Your are not Authourizied To Delete in Comment",403))
   Comment && res.json({message:"Comment Deleted"})
})

export {
addComment ,
getSpacificComment ,
updateComment ,
deleteComment

}