import { EventEmitter } from "events";
import { generateToken } from "../security/token.security.js";
import { emailTemplate } from "../email/template/email.template.js";
import { sendEmail } from "../email/send.email.js";
export const emailEvent=new EventEmitter()
emailEvent.on("confirmEmail",async({email}={})=>{
    const emailTOken=generateToken({payload:{email,isLoggedIn:true},expiresIn:{expiresIn:"1h"}})
    const emailLink=`confirmEmail/${emailTOken}`
    const html=emailTemplate({link:emailLink})
    await sendEmail({to:email,subject:"confirmEmail",html})
})