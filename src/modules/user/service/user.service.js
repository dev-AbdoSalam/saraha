import messageModel from "../../../DB/model/Message.model.js";
import userModel from "../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateDecryption } from "../../../utils/security/encryption.security.js";
import { compareHash, generateHash } from "../../../utils/security/hash.security.js";

export const userProfile = asyncHandler(async (req, res, next) => {
    req.user.phone=generateDecryption({cipherText:req.user.phone})
    const messages=await messageModel.find({recipientId:req.user._id}).populate([{
        path:"recipientId",
        select:"-password"
    }])
    return successResponse({ res, data: { user: req.user ,messages} })
})
export const shareProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({ _id: req.params.userId, isDeleted: false })
    return user ? successResponse({ res, data: { user } }) : next(new Error("in-valid user", { cause: 404 }))
})

export const updateProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    return successResponse({ res, data: { user } })
})
export const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, password } = req.body
    if (!compareHash({ plainText: oldPassword, hashValue: req.user.password })) {
        return next(new Error("in-valid oldPassword", { cause: 400 }))
    }
    const hashPassword = generateHash({ plainText: password })
    const user = await userModel.findByIdAndUpdate(req.user._id, { password: hashPassword, changeCredientialsTime: Date.now() }, { new: true, runValidators: true })
    return successResponse({ res, data: { user } })
})
export const freezeProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user._id, { isDeleted: true, changeCredientialsTime: Date.now() }, { new: true, runValidators: true })
    return successResponse({ res, data: { user } })
})
