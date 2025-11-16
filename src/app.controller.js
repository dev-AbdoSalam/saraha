import {connectionDB} from "./DB/connection.js"
import { globalErrorHandling } from "./utils/error/error.js"
import authController from "./modules/auth/auth.controller.js"
import userController from "./modules/user/user.controller.js"
import messageController from "./modules/message/message.controller.js"
import cors from "cors"
export const bootstrap = (app, express) => {
    app.use(cors())
    // convert buffer to txt
    app.use(express.json())
    
    // Routing
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use("/auth",authController)
    app.use("/user",userController)
    app.use("/message",messageController)
    app.use(globalErrorHandling)
    // DB
    connectionDB()
}