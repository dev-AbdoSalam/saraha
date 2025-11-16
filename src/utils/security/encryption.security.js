import CryptoJS from "crypto-js"

export const generateEncryption=({plainText="",sigantrue=process.env.SIGNATURE_ENC}={})=>{
    const encryption=CryptoJS.AES.encrypt(plainText,sigantrue).toString()
    return encryption
}
export const generateDecryption=({cipherText="",sigantrue=process.env.SIGNATURE_ENC}={})=>{
    const decryption=CryptoJS.AES.decrypt(cipherText,sigantrue).toString(CryptoJS.enc.Utf8)
    return decryption
}
