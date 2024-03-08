import { userModel } from "../../../database/models/user.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import randomInt from 'random-int'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let emailVerificationNumbers = {};
const signUp =catchAsyncError(async (req,res,next)=>{
    const userEmail = req.body.email;
    const gmail =await userModel.findOne({email:req.body.email})
    if(gmail && gmail.confrimEmail) return next(new AppError("Account Already Exist",403))

    if(req.file){
        req.body.imgCover =req.file.filename
    }
    const user =new userModel(req.body)
    await user.save()
    const   transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "anamohamedahmed893@gmail.com",
            pass: process.env.PASSWORD_EMAIL,
        },
    });
    const verificationNumber = randomInt(1000, 9999); // توليد رقم تحقق عشوائي بين 1000 و 9999
    emailVerificationNumbers[userEmail] = verificationNumber;
    const mailOptions = {
        from: '"Mohamed 👻" <anamohamedahmed893@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Confirm Your Email ✔", // Subject line
        text:`${verificationNumber}`,
    };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message:'Error sending email' + error});
        }
    });
    res.json({message:"Success and Code Has been sent In Your Email To Verfiy Email",user})
})



const signIn=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body
    const user =await userModel.findOne({email})
    if(!user) return next(new AppError("Account Not Found",401))
    if(!(await bcrypt.compare(password, user.password))) return next(new AppError("Password Wrong",403))

    if(!user.confrimEmail) return next(new AppError("Please Verfiy Your Email and Login Again"))
    let token = jwt.sign({userId:user._id,userName:user.name,Gender:user.gender,Email:user.email,Phone:user.phone },process.env.SECRET_KEY );
    res.json({message:"success",token})
})

const verfiyEmail=catchAsyncError(async(req,res,next)=>{
      const userEmail = req.body.email;
  const userEnteredNumber = req.body.code;
  const email =await userModel.findOne({email:req.body.email})
  if(!email) return next(new AppError("You Must Sign Up Before"))
  if (emailVerificationNumbers[userEmail] === parseInt(userEnteredNumber, 10)) {
   let user = await userModel.findOneAndUpdate({email:userEmail},{confrimEmail:true},{new:true})
   let token = jwt.sign({userId:user._id,userName:user.name,Gender:user.gender,Email:user.email,Phone:user.phone },process.env.SECRET_KEY );
    res.status(200).json({message:"The Verfication Successful" ,token})
  } else {
    // التحقق فاشل
    res.status(403).json({message:"The Code you Entered is incorrect"})
  }
})



export {
    signUp ,
    signIn ,
    verfiyEmail 
}




// app.post('/send-verification', (req, res) => {
//   const userEmail = req.body.email;
//   const verificationNumber = randomInt(1000, 9999); // توليد رقم تحقق عشوائي بين 1000 و 9999

//   emailVerificationNumbers[userEmail] = verificationNumber;

//   const mailOptions = {
//     from: 'your@gmail.com', // حساب Gmail الخاص بك
//     to: userEmail,
//     subject: 'رقم التحقق',
//     text: `رقم التحقق الخاص بك هو: ${verificationNumber}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('فشل في إرسال رقم التحقق');
//     } else {
//       console.log('تم إرسال رقم التحقق: ' + info.response);
//       res.status(200).send('تم إرسال رقم التحقق بنجاح');
//     }
//   });
// });

// app.post('/verify-number', (req, res) => {
//   const userEmail = req.body.email;
//   const userEnteredNumber = req.body.number;

//   if (emailVerificationNumbers[userEmail] === parseInt(userEnteredNumber, 10)) {
//     // التحقق ناجح
//     // يمكنك هنا تحديث حالة التحقق في قاعدة البيانات
//     res.status(200).send('تم التحقق بنجاح');
//   } else {
//     // التحقق فاشل
//     res.status(403).send('رقم التحقق غير صحيح');
//   }
// });

// app.listen(port, () => {
//   console.log(`التطبيق يعمل على http://localhost:${port}`);
// });

