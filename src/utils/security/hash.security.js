import bcrypt from "bcrypt"

export const generateHash=({plainText="",salt=parseInt(process.env.SALT)}={})=>{
    const hash=bcrypt.hashSync(plainText,salt)
    return hash
}
export const compareHash=({plainText="",hashValue={}}={})=>{
    const hash=bcrypt.compareSync(plainText,hashValue)
    return hash
}