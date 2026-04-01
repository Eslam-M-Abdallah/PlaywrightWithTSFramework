import { test, expect } from "../../fixtures/hooks-fixtures"
import kashierApiPathData from "../../test-data/api-data/api-kashier-path-data.json"
import testData from "../../test-data/api-data/api-account-lockout-expired-data.json"

// ─────────────────────────────────────────────────────────────────────────────
// Account Lockout, Rate Limiting & Expired Password — TC-13 | TC-14 | TC-08 | TC-09 | TC-17
// Lockout account 1 : hyfuzizi@cyclelove.cc    (TC-13 & TC-08)
// Lockout account 2 : e4szws6xwi@xkxkud.com   (TC-14)
// Lockout account 3 : lg3x206u1m@xkxkud.com   (TC-17)
// Admin-reset account: z2j5x4qkrd@wnbaldwy.com (TC-09)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE A : Account Lockout & Rate Limiting
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria - API] Account Lockout & Rate Limiting Rules",
    {
        tag: "@Password_Criteria",
        annotation: { type: "Story Jira Link", description: "https://your_Jira_Story_Link_URL" }
    }, () => {

        // TC-13
        test("[TC-13] Verify That API Locks Account And Returns Lockout Error After 5 Consecutive Failed Login Attempts",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                await test.step("Send Login Request With Wrong Password - Attempt 1", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email, password: testData.wrong_Password_Attempt_1 }
                    })
                })

                //2-
                await test.step("Send Login Request With Wrong Password - Attempt 2", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email, password: testData.wrong_Password_Attempt_2 }
                    })
                })

                //3-
                await test.step("Send Login Request With Wrong Password - Attempt 3", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email, password: testData.wrong_Password_Attempt_3 }
                    })
                })

                //4-
                await test.step("Send Login Request With Wrong Password - Attempt 4", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email, password: testData.wrong_Password_Attempt_4 }
                    })
                })

                //5-
                let lastResp: any
                await test.step("Send Login Request With Wrong Password - Attempt 5 (Triggering Account Lockout)", async () => {
                    lastResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email, password: testData.wrong_Password_Attempt_5 }
                    })
                })

                //6-
                await test.step("Verify That The API Returns Account Lockout Error After The 5th Consecutive Failed Attempt", async () => {
                    const lastJson = await lastResp.json()
                    console.log(lastJson)
                    expect(lastResp.ok()).toBeFalsy()
                    expect(lastJson.error).toBe(testData.account_Locked_Error)
                })
            })

        // TC-14
        test("[TC-14] Verify That API Triggers Rate Limiting Error After 5 Consecutive Failed Login Attempts",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                await test.step("Send Login Request With Wrong Password - Attempt 1", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email_2, password: testData.wrong_Password_Attempt_1 }
                    })
                })

                //2-
                await test.step("Send Login Request With Wrong Password - Attempt 2", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email_2, password: testData.wrong_Password_Attempt_2 }
                    })
                })

                //3-
                await test.step("Send Login Request With Wrong Password - Attempt 3", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email_2, password: testData.wrong_Password_Attempt_3 }
                    })
                })

                //4-
                await test.step("Send Login Request With Wrong Password - Attempt 4", async () => {
                    await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email_2, password: testData.wrong_Password_Attempt_4 }
                    })
                })

                //5-
                let lastResp: any
                await test.step("Send Login Request With Wrong Password - Attempt 5 (Triggering Rate Limiter)", async () => {
                    lastResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data: { email: testData.lockout_Test_Email_2, password: testData.wrong_Password_Attempt_5 }
                    })
                })

                //6-
                await test.step("Verify That The API Returns Rate Limiting Error After The 5th Consecutive Failed Attempt", async () => {
                    const lastJson = await lastResp.json()
                    console.log(lastJson)
                    expect(lastResp.ok()).toBeFalsy()
                    expect(lastJson.error).toBe(testData.rate_Limit_Error)
                })
            })
    })

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE B : Expired & Admin-Reset Password Flows
// NOTE: TC-08 uses lockout_Test_Email (hyfuzizi@cyclelove.cc) which is locked
//       by TC-13 above — the locked account returns 400, satisfying the test.
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria - API] Expired & Admin-Reset Password Flows",
    {
        tag: "@Password_Criteria",
        annotation: { type: "Story Jira Link", description: "https://your_Jira_Story_Link_URL" }
    }, () => {

        // TC-08
        test("[TC-08] Verify That API Returns HTTP 400 When User Authenticates With An Expired Or Locked Account",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let loginResp: any
                await test.step("Send Authentication Request With A Locked/Expired Account", async () => {
                    loginResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.lockout_Test_Email,
                            password: testData.lockout_Test_Password
                        }
                    })
                    const loginJson = await loginResp.json()
                    console.log(loginJson)
                })

                //2-
                await test.step("Verify That The API Returns HTTP 400 Status Code Indicating The Account Is Locked Or Password Has Expired", async () => {
                    expect(loginResp.ok()).toBeFalsy()
                    expect(loginResp.status()).toBe(400)
                })
            })

        // TC-09
        test("[TC-09] Verify That API Returns Force Reset Error When User Authenticates With Admin-Reset Temporary Password",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let loginResp: any
                let loginJson: any
                await test.step("Send Authentication Request Using The Temporary Password Set By The Admin", async () => {
                    loginResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.temp_Email_Admin_Reset,
                            password: testData.temp_Password_Admin_Reset
                        }
                    })
                    loginJson = await loginResp.json()
                    console.log(loginJson)
                })

                //2-
                await test.step("Verify That The API Blocks Login And Returns Force Password Reset Error Message", async () => {
                    expect(loginResp.ok()).toBeFalsy()
                    expect(loginJson.error).toBe(testData.admin_Reset_Force_Change_Error)
                })
            })

        // TC-17
        test("[TC-17] Verify That API Returns HTTP 400 Status Code After Account Gets Locked Due To 5 Failed Login Attempts",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                await test.step("Send 5 Consecutive Failed Login Attempts To The Authenticate Endpoint To Lock The Account", async () => {
                    for (let attempt = 1; attempt <= 5; attempt++) {
                        await request.post(kashierApiPathData.authenticate_Path, {
                            data:
                            {
                                email: testData.lockout_Test_Email_3,
                                password: `WrongPass@00${attempt}`
                            }
                        })
                    }
                })

                //2-
                let lockedResp: any
                await test.step("Send One Additional Login Attempt After Account Lockout And Capture The Response", async () => {
                    lockedResp = await request.post(kashierApiPathData.authenticate_Path, {
                        data:
                        {
                            email: testData.lockout_Test_Email_3,
                            password: testData.wrong_Password_Attempt_5
                        }
                    })
                })

                //3-
                await test.step("Verify That The API Returns Lockout Error Message For The Locked Account", async () => {
                    const lockedJson = await lockedResp.json()
                    console.log(lockedJson)
                    expect(lockedResp.ok()).toBeFalsy()
                    expect(lockedJson.error).toBe(testData.account_Locked_Error)
                })
            })
    })
