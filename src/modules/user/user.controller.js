import { Router } from "express";
import * as userService from "./service/user.service.js"
import { authentication, authorization } from "../../middleware/authentication.middleware.js";
import { endPoint } from "./service/user.endPoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./user.validation.js"
const router=Router()
router.get("/userProfile",authentication(),authorization(endPoint.profile),userService.userProfile)
router.patch("/profile/updateProfile",authentication(),authorization(endPoint.profile),validation(validators.updateProfile),userService.updateProfile)
router.patch("/profile/updatePassword",authentication(),authorization(endPoint.profile),validation(validators.updatePassword),userService.updatePassword)
router.delete("/profile/freezeProfile",authentication(),authorization(endPoint.profile),userService.freezeProfile)
router.get("/profile/shareProfile/:userId",authentication(),authorization(endPoint.profile),validation(validators.shareProfile),userService.shareProfile)
export default router