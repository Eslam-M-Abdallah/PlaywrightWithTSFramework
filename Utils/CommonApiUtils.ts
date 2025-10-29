import { APIRequestContext } from "@playwright/test";
import apiPathData from "../test-data/api-data/api-path-data.json"
import commonUtils from "./commonUtils";

export default class CommonApiUtils {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }
    public async createToken() {
        const commonUtilsObj = new commonUtils()
        const apiDecryptedUserName = commonUtilsObj.decryptData(process.env.API_USER_NAME!)
        const apiDecryptedPassword = commonUtilsObj.decryptData(process.env.API_PASSWORD!)
        const createTokenResp =  await this.request.post(apiPathData.Auth_Path,
            {
                data: {
                    "username": apiDecryptedUserName,
                    "password": apiDecryptedPassword
                }
            })
        const createTokenJsonResp = await createTokenResp.json()
        console.log(createTokenJsonResp.token)
        return createTokenJsonResp.token 
    }
}