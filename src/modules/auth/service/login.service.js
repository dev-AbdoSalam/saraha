import userModel from "../../../DB/model/User.model.js";
import { userRole } from "../../../middleware/authentication.middleware.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import { generateToken } from "../../../utils/security/token.security.js";

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("in-valid login data", { cause: 404 }))
    }
    if (!user.confirmEmail) {
        return next(new Error("please confirm email", { cause: 400 }))

    }
    if (!compareHash({ plainText: password, hashValue: user.password })) {
        return next(new Error("in-valid login data", { cause: 404 }))
    }
    const token = generateToken({
        payload: { id: user._id, isLoggedIn: true },
        sigantrue: user.role == userRole.admin ? process.env.SIGNATURE_TOKEN_ADMIN : process.env.SIGNATURE_TOKEN_USER,
        expiresIn: { expiresIn: "1h" }
    })
    if(user.isDeleted){
        user.isDeleted=false
        await user.save()
    }
    return successResponse({ res, status: 200, message: "login", data: { token } })
})
