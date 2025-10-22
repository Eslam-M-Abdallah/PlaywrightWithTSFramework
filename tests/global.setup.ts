import {test} from "../fixtures/common-fixtures"
import {expect} from "@playwright/test"

test("Global Setup For Auto login",async({page , loginPage , commonUtils , dasboardPage})=>
    {
        test.setTimeout(60_000)
        await loginPage.goToOrangeHrm()
        test.setTimeout(60_000)
        const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!)
        const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!)
        await loginPage.loginToOrangeHrm(decryptedUserName , decryptedPassword)
        await page.waitForURL(process.env.BASE_URL + "/web/index.php/dashboard/index")
        await expect(dasboardPage.dashboardTitletxt).toHaveText("Dashboard")
        /**
         * Save The Authentication State 
         * 
         */
        await page.context().storageState(
            {
                path : './Playwright/.auth/auth1.json'
            })
    })