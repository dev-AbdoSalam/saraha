import joi from "joi";
import { Types } from "mongoose";

export const validationId=(value,helper)=>{
    return Types.ObjectId.isValid(value)?true:helper.message("in-valid objectId")
}

export const generalFields={
    userName:joi.string().trim().min(2).max(30),
    email:joi.string().email({minDomainSegments:2,maxDomainSegments:3,tlds:{allow:["com" , "edu"]}}),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    confirmPassword:joi.string(),
    phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    id:joi.string().custom(validationId)
}


export const validation=(schema)=>{
    return (req,res,next)=>{
        const inputData={...req.body,...req.query,...req.params}
        const validationResult=schema.validate(inputData,{abortEarly:false})
        if(validationResult.error){
            return res.status(400).json({message:"error validation",validationResult:validationResult.error.details})
        }
        return next()
    }
}