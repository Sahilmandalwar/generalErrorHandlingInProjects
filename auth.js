import catchAsyncError from "./catchAsyncError.js";
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';     // must have jsonwebtoken installed
import { ErrorHandler } from "../utils/errorHandler.js";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler("Login to access this resource", 401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);    // collect token from cookie and verify it and return payload saved
    req.user = await User.findById(decodedData.id);  // searching happening here  
    next();
})

export const authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}
