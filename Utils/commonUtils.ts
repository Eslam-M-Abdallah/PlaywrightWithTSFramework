import { error } from "console"
import cryptoJS from "crypto-js"


export default class commonUtils {
    private secretKey: string

    /**
     * Intilalizing Secret Key From User Environment Varible "SECRET_KEY"
     */
    constructor() {
        this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "The Secret Key Is Not Exist"
        /* if (process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY
        }
        else {
            throw new Error("The Secret Key Is Not Exist") 
        } */
    }

    /**
     * Provide Encrypted Data From String
     * @param data 
     * @returns encryptedData
     */
    public encryptData(data: string) {
        const encryptedData = cryptoJS.AES.encrypt(data, this.secretKey).toString()
        //console.log(`Encrypted Data Value = ${encryptedData}`)
        return encryptedData
    }

    /**
     * Provide Decrypted Data In String
     * @param encdata 
     * @returns decryptedData
     */
    public decryptData(encdata: string) {
        const decryptedData = cryptoJS.AES.decrypt(encdata, this.secretKey).toString(cryptoJS.enc.Utf8)
        //console.log(`Decrypted Data Value = ${decryptedData}`)
        return decryptedData
    }

    
    
}