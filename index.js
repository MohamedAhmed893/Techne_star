import express from 'express'
import dotenv from 'dotenv'
import { dbconnection } from './database/dbconnection.js'
import { AppError } from './src/utils/AppError.js'
import authRouter from './src/modules/auth/auth.router.js'
import userRouter from './src/modules/users/user.router.js'
import blogRouter from './src/modules/blog/blog.router.js'
import commentRouter from './src/modules/comment/comment.router.js'
import cors from 'cors'

const app =express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(express.static('uploads/'))
app.use(express.urlencoded({ extended: true }))
app.use('/auth',authRouter)
app.use('/users',userRouter)
app.use('/blog',blogRouter)
app.use('/comment',commentRouter)

app.all('*',(req,res,next)=>{
    next(new AppError('Page Not Found',404))
})
app.use((err,req,res,next)=>{
    let code =err.statusCode || 500
    res.status(code).json({message:err.message ,stack:err.stack})
})
dbconnection()
app.listen(process.env.PORT||5002,()=>{
    console.log("Server Running ..");
})