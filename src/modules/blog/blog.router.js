import express from 'express'
import * as blogCo from './blog.controller.js'
import { allowedTo, protectedRoutes } from '../middleware/auths.js'
import { uploadFile } from '../middleware/uploadFile.js'

const blogRouter = express.Router()
blogRouter.post('/',protectedRoutes,allowedTo('admin'),uploadFile('image','blog'),blogCo.addBlog)
blogRouter.get('/',blogCo.getAllBlog)
blogRouter.get('/:id',blogCo.getSpacificBlog)
blogRouter.put('/:id',protectedRoutes,allowedTo('admin'),uploadFile('image','blog'),blogCo.updateBlog)
blogRouter.delete('/:id',protectedRoutes,allowedTo('admin'),blogCo.deleteBlog)
blogRouter.get('/getcomments/:blog',protectedRoutes,blogCo.getAllCommentsOfBlog)

export default blogRouter