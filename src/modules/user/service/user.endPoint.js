import { userRole } from "../../../middleware/authentication.middleware.js";

export const endPoint={
    profile:Object.values(userRole)
}