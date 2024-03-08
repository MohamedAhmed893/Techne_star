import { userModel } from "../../../database/models/user.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import jwt from 'jsonwebtoken'

const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new AppError("TOKEN MUST BE PROVIDED", 401))
    const decoded = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("Account Not Found", 401))
    req.user = user
    next()
})

const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError("You are not authorized to access this route you are " + req.user.role, 401))
        next()

    })
}

export {
    protectedRoutes ,
    allowedTo
}