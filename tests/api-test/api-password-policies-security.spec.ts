import { test, expect } from "../../fixtures/hooks-fixtures"
import kashierApiPathData from "../../test-data/api-data/api-kashier-path-data.json"
import testData from "../../test-data/api-data/api-password-policies-security-data.json"

// ─────────────────────────────────────────────────────────────────────────────
// Password Policies & Security Rules — TC-10 | TC-11 | TC-12 | TC-9
// Account used : 1gbc3uv4me@lnovic.com / Password500$$
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria - API] Password Policies & Security Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-10
        test("[TC-10] Verify That API Prevents Reuse Of The Last 12 Passwords In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let authToken: string = ""
                await test.step("Authenticate With Staging Credentials To Obtain Auth Token", async () => {
                    const loginResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.change_Password_Test_Email,
                            password: testData.change_Password_Test_Password
                        }
                    })
                    const loginJson = await loginResp.json()
                    console.log(loginJson)
                    expect(loginResp.ok()).toBeTruthy()
                    authToken = loginJson.body.accessToken.token
                })

                //2-
                await test.step("Send Change Password Request With A Previously Used Password And Verify API Returns Reuse Error", async () => {
                    const changePassResp = await request.put(kashierApiPathData.change_Password_Path, {
                        headers: { 'Authorization': `Bearer ${authToken}` },
                        data:
                        {
                            currentPassword: testData.change_Password_Test_Password,
                            newPassword: testData.old_Password_Reused
                        }
                    })
                    const changePassJson = await changePassResp.json()
                    console.log(changePassJson)
                    expect(changePassResp.ok()).toBeFalsy()
                    expect(changePassJson.error).toBe(testData.reused_Password_Error)
                })
            })

        // TC-11
        test("[TC-11] Verify That API Blocks Password Change Within 24 Hours Of Last Change",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let authToken: string = ""
                await test.step("Authenticate With Staging Credentials To Obtain Auth Token", async () => {
                    const loginResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.change_Password_Test_Email,
                            password: testData.change_Password_Test_Password
                        }
                    })
                    const loginJson = await loginResp.json()
                    console.log(loginJson)
                    expect(loginResp.ok()).toBeTruthy()
                    authToken = loginJson.body.accessToken.token
                })

                //2-
                await test.step("Send Change Password Request Again Within 24 Hours And Verify API Returns 24-Hour Interval Error", async () => {
                    const changePassResp = await request.put(kashierApiPathData.change_Password_Path, {
                        headers: { 'Authorization': `Bearer ${authToken}` },
                        data:
                        {
                            currentPassword: testData.change_Password_Test_Password,
                            newPassword: testData.valid_Password_12_Chars
                        }
                    })
                    const changePassJson = await changePassResp.json()
                    console.log(changePassJson)
                    expect(changePassResp.ok()).toBeFalsy()
                    expect(changePassJson.error).toBe(testData.min_Change_Interval_Error)
                })
            })

        // TC-12
        test("[TC-12] Verify That API Rejects A Password That Is The Same As The Username In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let authToken: string = ""
                await test.step("Authenticate With Staging Credentials To Obtain Auth Token", async () => {
                    const loginResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.change_Password_Test_Email,
                            password: testData.change_Password_Test_Password
                        }
                    })
                    const loginJson = await loginResp.json()
                    console.log(loginJson)
                    expect(loginResp.ok()).toBeTruthy()
                    authToken = loginJson.body.accessToken.token
                })

                //2-
                await test.step("Send Change Password Request With A New Password That Is Identical To The Username And Verify API Returns Same-As-Username Error", async () => {
                    const changePassResp = await request.put(kashierApiPathData.change_Password_Path, {
                        headers: { 'Authorization': `Bearer ${authToken}` },
                        data:
                        {
                            currentPassword: testData.change_Password_Test_Password,
                            newPassword: testData.password_Same_As_Username
                        }
                    })
                    const changePassJson = await changePassResp.json()
                    console.log(changePassJson)
                    expect(changePassResp.ok()).toBeFalsy()
                    expect(changePassJson.error).toBe(testData.same_As_Username_Error)
                })
            })

        // TC-9
        test("[TC-9] Verify That API Rejects A Password That Includes The Store Name In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let authToken: string = ""
                await test.step("Authenticate With Staging Credentials To Obtain Auth Token", async () => {
                    const loginResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.change_Password_Test_Email,
                            password: testData.change_Password_Test_Password
                        }
                    })
                    const loginJson = await loginResp.json()
                    console.log(loginJson)
                    expect(loginResp.ok()).toBeTruthy()
                    authToken = loginJson.body.accessToken.token
                })

                //2-
                await test.step("Send Change Password Request With A New Password That Contains The Store Name And Verify API Returns Store Name Inclusion Error", async () => {
                    const changePassResp = await request.put(kashierApiPathData.change_Password_Path, {
                        headers: { 'Authorization': `Bearer ${authToken}` },
                        data:
                        {
                            currentPassword: testData.change_Password_Test_Password,
                            newPassword: testData.password_Include_Storename
                        }
                    })
                    const changePassJson = await changePassResp.json()
                    console.log(changePassJson)
                    expect(changePassResp.ok()).toBeFalsy()
                    expect(changePassJson.error).toBe(testData.include_Storename_Error)
                })
            })
    })
