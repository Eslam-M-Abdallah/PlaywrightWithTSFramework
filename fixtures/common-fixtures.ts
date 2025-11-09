import { request } from "http"
import { test as baseTest } from "../fixtures/pom-fixtures"
import CommonApiUtils from "../Utils/CommonApiUtils"
import commonUtils from "../Utils/commonUtils"

type commonFixtures =
    {
        commonUtils: commonUtils,
        commonAPiUtils: CommonApiUtils
    }

export const test = baseTest.extend<commonFixtures>(
    {
        commonUtils: async ({ }, use) => {
            const commonUtilsObj = new commonUtils
            await use(commonUtilsObj)
        },
        commonAPiUtils: async ({ request }, use) => {
            await use(new CommonApiUtils(request))
        }
    })