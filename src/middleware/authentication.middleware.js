import userModel from "../DB/model/User.model.js"
import { asyncHandler } from "../utils/error/error.js"
import { verifyToken } from "../utils/security/token.security.js"

export const userRole = {
    user: "user",
    admin: "admin"
}

export const authentication = () => {
    return asyncHandler(
        async (req, res, next) => {
            const { authorization } = req.headers
            const [bearer, token] = authorization?.split(" ") || []
            if (!bearer || !token) {
                return next(new Error("in-valid token components", { cause: 400 }))
            }
            let signature = ""
            switch (bearer) {
                case userRole.user:
                    signature = process.env.SIGNATURE_TOKEN_USER
                    break;
                case userRole.admin:
                    signature = process.env.SIGNATURE_TOKEN_ADMIN
                    break;

                default:
                    break;
            }
            const decoded = verifyToken({ token, signature })
            if (!decoded?.id) {
                return next(new Error("in-valid token payload", { cause: 400 }))
            }
            const user = await userModel.findById(decoded.id)
            if (!user) {
                return next(new Error("in-valid register account", { cause: 404 }))
            }
            if (user.changeCredientialsTime?.getTime()>= decoded.iat * 1000) {
                return next(new Error("in-valid credientails", { cause: 401 }))

            }            
            req.user = user
            return next()
        }
    )
}
export const authorization = (accessRoles = []) => {
    return asyncHandler(
        async (req, res, next) => {
            if (!accessRoles.includes(req.user.role)) {
                return next(new Error("not authorized account", { cause: 403 }))
            }
            return next()
        }
    )
}
