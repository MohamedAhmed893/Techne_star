import express from 'express'
import * as AuthCo from './auth.controller.js'
import { uploadFile } from '../middleware/uploadFile.js'


const authRouter =express.Router()
authRouter.post('/signup',uploadFile('image','user'),AuthCo.signUp)
authRouter.post('/signin',AuthCo.signIn)
authRouter.patch('/verfiy',AuthCo.verfiyEmail)

export default authRouter