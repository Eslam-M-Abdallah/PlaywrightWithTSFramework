import { test, expect } from "../fixtures/hooks-fixtures"
import loginModuleData from "../test-data/login-module-data.json"

/**
 * Exclude This Test File From The Authentication State Reuse
 */
test.use(
    {
        storageState:
        {
            cookies: [],
            origins: []
        }
    })

test.describe("[Negative Scenarios] Invalid Login To The OrangeHRM Application",
    {
        tag: '@negative_Scenario',
        annotation:
        {
            type: 'Story Jira Link',
            description: 'The Link Of The Jira Story'
        }
    }, () => {
        test("[Login] Verify That The User Can Not Login With Invalid Password",
            {
                tag: ['@login_Module', '@Ui', '@Demo_Env']
                , annotation:
                {
                    type: 'Tc Jira Link',
                    description: 'https://your_Jira_link_URL'
                }
            }, async ({ gotoUrl, loginPage, commonUtils }) => {
                const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!)
                await loginPage.loginToOrangeHrm(decryptedUserName, loginModuleData.wrong_Password)
                await expect(loginPage.invalidCredintilasErrorPopup).toHaveText(loginModuleData.invalid_Credintials_Text)
                await expect(loginPage.userNameInput).toBeVisible()
            })

        test("[Login] Verify That The User Can Not Login With Invalid Username",
            {
                tag: ['@login_Module', '@Ui', '@Demo_Env']
                , annotation:
                {
                    type: 'Tc Jira Link',
                    description: 'https://your_Jira_link_URL'
                }
            }, async ({ gotoUrl, loginPage, commonUtils }) => {
                const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!)
                await loginPage.loginToOrangeHrm(loginModuleData.wrong_Username, decryptedPassword)
                await expect(loginPage.invalidCredintilasErrorPopup).toHaveText(loginModuleData.invalid_Credintials_Text)
                await expect(loginPage.userNameInput).toBeVisible()
            })

        test("[Login] Verify That The User Can Not Login With Invalid Username & Password ",
            {
                tag: ['@login_Module', '@Ui', '@Demo_Env']
                , annotation:
                {
                    type: 'Tc Jira Link',
                    description: 'https://your_Jira_link_URL'
                }
            }, async ({ gotoUrl, loginPage }) => {
                await loginPage.loginToOrangeHrm(loginModuleData.wrong_Username, loginModuleData.wrong_Password)
                await expect(loginPage.invalidCredintilasErrorPopup).toHaveText(loginModuleData.invalid_Credintials_Text)
                await expect(loginPage.userNameInput).toBeVisible()
            })
    })


test.describe("[Positive Scenarios] Valid Login To The OrangeHRM Application",
    {
        tag: '@Positive_Scenario',
        annotation:
        {
            type: "Story Jira Link",
            description: 'Here Is The Story Link'
        }
    }, () => {
        test('[Login] Verify That The User Can Login Successfully  With Valid Username & Password',
            {
                tag: ['@login_Module', '@Visual', '@Demo_Env'],
                annotation:
                {
                    type: 'TC Jira Link',
                    description: 'Here Is The Tc Link'
                }
            }, async ({ gotoUrl, loginPage, commonUtils, sideMenuPage }) => {
                //1-
                await test.step("User Enter Login Successfully With Valid User NAme & Password ", async () => {
                    const userName = commonUtils.decryptData(process.env.USER_NAME!)
                    const password = commonUtils.decryptData(process.env.PASSWORD!)
                    await loginPage.loginToOrangeHrm(userName, password)
                })

                //2-
                await test.step("Ensure That The User Login Successfully By Assert That The Brand Logo & Side pannel Is Exist After Login", async () => {
                    await expect(sideMenuPage.orengeHrmLogo).toHaveScreenshot('orangeHrmBrandLogo.png' , 
                        {
                            maxDiffPixels : 60 ,
                            maxDiffPixelRatio : 0.20
                        })
                    await expect(sideMenuPage.sidePanel).toHaveScreenshot('sideMenuPanel.png',
                        {
                            maxDiffPixelRatio : 0.20 ,
                            maxDiffPixels : 100
                        })
                })


            })
    })


