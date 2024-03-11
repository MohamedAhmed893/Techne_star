import express from 'express'
import * as CommentCo from './comment.controller.js'
import { protectedRoutes } from '../middleware/auths.js'

const commentRouter =express.Router()

commentRouter.post('/',protectedRoutes,CommentCo.addComment)
commentRouter.get('/:id',protectedRoutes,CommentCo.getSpacificComment)
commentRouter.put('/:id',protectedRoutes,CommentCo.updateComment)
commentRouter.delete('/:id',protectedRoutes,CommentCo.deleteComment)

export default commentRouter