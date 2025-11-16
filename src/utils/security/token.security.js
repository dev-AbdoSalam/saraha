import jwt from "jsonwebtoken"

export const generateToken=({payload={},signature=process.env.TOEKN_SIGNATURE_ADMIN,expiresIn={}}={})=>{
    const token=jwt.sign(payload,signature,expiresIn)
    return token
}
export const verifyToken=({token={},signature=process.env.TOEKN_SIGNATURE_ADMIN}={})=>{
    const decoded=jwt.verify(token,signature)
    return decoded
}

