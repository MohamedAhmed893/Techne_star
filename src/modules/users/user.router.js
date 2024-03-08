import express from 'express'
import { changeResetPassword, deleteUser, forgetPassword, getUser, resetPassword, updateUser } from './user.controller.js'
import { protectedRoutes } from '../middleware/auths.js'
import { uploadFile } from '../middleware/uploadFile.js'


const userRouter =express.Router()
userRouter.get('/',protectedRoutes,getUser)
userRouter.put('/',protectedRoutes,uploadFile('image','blog'),updateUser)
userRouter.delete('/',protectedRoutes,deleteUser)
userRouter.post('/forgot-password', forgetPassword);

// Endpoint to render the password reset page
userRouter.get('/reset-password/:token', changeResetPassword);

// Endpoint to handle password reset form submission
userRouter.post('/reset-password/:token', resetPassword);
export default userRouter