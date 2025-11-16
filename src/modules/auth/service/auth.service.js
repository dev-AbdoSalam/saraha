import userModel from "../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { emailEvent } from "../../../utils/events/email.events.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateEncryption } from "../../../utils/security/encryption.security.js";
import { generateHash } from "../../../utils/security/hash.security.js";
import { verifyToken } from "../../../utils/security/token.security.js";

export const signup=asyncHandler(async(req,res,next)=>{
    const {userName,email,password,phone}=req.body 
    const checkUser=await userModel.findOne({email})
    if(checkUser){
        return next(new Error("email exist",{cause:409}))
    }
    const hashPassword=generateHash({plainText:password})
    const hashPhone=generateEncryption({plainText:phone})
    const user=await userModel.create({userName,email,password:hashPassword,phone:hashPhone})
    emailEvent.emit("confirmEmail",{email})
    return successResponse({res,status:201,message:"signup",data:{user}})
})
export const confirmEmail=asyncHandler(async(req,res,next)=>{
    const {authorization}=req.headers 
    const decoded=verifyToken({token:authorization})
    const user=await userModel.findOneAndUpdate(decoded.id,{confirmEmail:true},{new:true})
    return successResponse({res,message:"confirmed",data:{user}})
})