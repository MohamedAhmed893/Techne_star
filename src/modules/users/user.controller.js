import { userModel } from "../../../database/models/user.js";
import { htmlResetPassword } from "../../mails/templete1.js";
import { template3 } from "../../mails/templete2.js";
import { template4 } from "../../mails/templete3.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import jwt from 'jsonwebtoken'
import { createTransport } from "nodemailer";

const getUser =catchAsyncError(async (req,res,next)=>{
    const user =await userModel.findById(req.user._id)
    if(!user) next(new AppError("User Not Found",401))
    res.status(200).json({message:"success",user})
})

const updateUser =catchAsyncError (async(req,res,next)=>{
    if(req.file){
        req.body.imgCover =req.file.filename
    }
    const user =await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
    !user && next(new AppError("User Not Found",403))
    user && res.json({message:"success",user})
})
const deleteUser =catchAsyncError (async(req,res,next)=>{
    const user =await userModel.findByIdAndDelete(req.user._id)
    !user && next(new AppError("User Not Found",403))
    user && res.json({message:"Acount Deleted"})
})

let forgetPassword = catchAsyncError(async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !user.confrimEmail) {
        return res.status(404).json({message:'User not Found or Not Verfied'});
    }

    // user.resetToken = token;
    let token = jwt.sign({ email: email }, "resetPassword")
    // Create a Nodemailer transporter
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: "anamohamedahmed893@gmail.com",
            pass: process.env.PASSWORD_EMAIL,
        },
    });


    // Send password reset email
    const mailOptions = {
        from: '"Mohamed 👻" <anamohamedahmed893@gmail.com>',
        to: email,
        subject: 'Password Reset ✔',
        html: htmlResetPassword(token),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message:'Error sending email' + error});
        }
        res.status(200).json({message:'Password reset email sent'});
    });

})

let changeResetPassword = catchAsyncError(async (req, res) => {
    const { token } = req.params;
    res.send(template3(token));
})

let resetPassword = catchAsyncError(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(password);
    jwt.verify(token, "resetPassword", async (err, decode) => {
        if (err) return res.json({ message: err })

        let user = await userModel.findOne({ email: decode.email });
        if (!user) {
            return res.status(404).json({message:'Email Not Found'});
        }
        // Update the user's password and clear the resetToken
        await userModel.findOneAndUpdate({ email: decode.email }, { password },{new:true})
        res.status(200).send(template4());

    })
})


export {
    getUser ,
    updateUser ,
    deleteUser ,
    forgetPassword ,
    changeResetPassword ,
    resetPassword
}