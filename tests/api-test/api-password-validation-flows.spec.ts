import { test, expect } from "../../fixtures/hooks-fixtures"
import OtpUtils from "../../Utils/otpUtils"
import kashierApiPathData from "../../test-data/api-data/api-kashier-path-data.json"
import testData from "../../test-data/api-data/api-password-validation-flows-data.json"

// ─────────────────────────────────────────────────────────────────────────────
// Password Validation Across Flows — TC-04 | TC-05 | TC-06
// TC-04 signup OTP  : gq4mmy13zk@lnovic.com
// TC-05 change-pass : gq4mmy13zk@lnovic.com / Password500$$
// TC-06 reset-pass  : shown-whom@jzkfgv4i.mailosaur.net (Mailosaur)
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria - API] Password Validation Across Registration, Change & Reset Flows",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-04
        test("[TC-04] Verify That API Returns Min Length Error When Registration Password Is Below Minimum During Account Creation",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                await test.step("Send OTP Generation Request For Test Email To Initiate Registration Flow", async () => {
                    const otpGenerateResp = await request.post(kashierApiPathData.otp_Generate_Signup_Path, {
                        data: { key: testData.signup_Test_Email }
                    })
                    const otpGenerateJson = await otpGenerateResp.json()
                    console.log(otpGenerateJson)
                    expect(otpGenerateResp.status()).toBe(201)
                })

                //2-
                await test.step("Submit Registration Request With Password Below 12 Characters And Verify API Returns Min Length Error", async () => {
                    const registerResp = await request.post(kashierApiPathData.register_Path, {
                        data:
                        {
                            signupKey: testData.signup_Test_Email,
                            password: testData.invalid_Password_Below_Min,
                            firstName: testData.first_Name,
                            lastName: testData.last_Name,
                            mobileNumber: testData.mobile_Number,
                            storeName: testData.store_Name,
                            countryCode: testData.country_Code
                        }
                    })
                    const registerJson = await registerResp.json()
                    console.log(registerJson)
                    expect(registerResp.status()).toBe(400)
                    expect(registerJson.message).toBe(testData.short_Password_Min_Length_Error)
                })
            })

        // TC-05
        test("[TC-05] Verify That API Returns Min Length Error When New Password Is Less Than 12 Characters In Change Password Flow",
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
                await test.step("Send Change Password Request With New Password Below 12 Characters And Verify API Returns Min Length Error", async () => {
                    const changePassResp = await request.put(kashierApiPathData.change_Password_Path, {
                        headers: { 'Authorization': `Bearer ${authToken}` },
                        data:
                        {
                            currentPassword: testData.change_Password_Test_Password,
                            newPassword: testData.invalid_Password_Below_Min
                        }
                    })
                    const changePassJson = await changePassResp.json()
                    console.log(changePassJson)
                    expect(changePassResp.status()).toBe(400)
                    expect(changePassJson.message).toBe(testData.change_Password_Min_Length_Error)
                })
            })

        // TC-06
        test("[TC-06] Verify That API Returns Min Length Error When New Password Is Less Than 12 Characters In Reset Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                const otpUtils = new OtpUtils()
                let resetOtpCode: string = ""
                await test.step("Send Password Reset Request For Mailosaur Test Email To Trigger OTP Email", async () => {
                    const resetPassResp = await request.post(kashierApiPathData.reset_Password_Path, {
                        data: { email: testData.reset_Password_Test_Email }
                    })
                    const resetPassJson = await resetPassResp.json()
                    console.log(resetPassJson)
                    expect(resetPassResp.ok()).toBeTruthy()
                    resetOtpCode = await otpUtils.getLatestOtp(testData.reset_Password_Test_Email)
                })

                //2-
                let resetToken: string = ""
                await test.step("Send OTP Verification Request For Password Reset Using The OTP From Email", async () => {
                    const otpVerifyResp = await request.post(kashierApiPathData.otp_Verify_Reset_Password_Path, {
                        data: { key: testData.reset_Password_Test_Email, code: resetOtpCode }
                    })
                    const otpVerifyJson = await otpVerifyResp.json()
                    console.log(otpVerifyJson)
                    expect(otpVerifyResp.ok()).toBeTruthy()
                    resetToken = otpVerifyJson.token ?? otpVerifyJson.resetToken ?? ""
                })

                //3-
                await test.step("Submit Reset Password Request With New Password Below 12 Characters And Verify API Returns Min Length Error", async () => {
                    const resetVerifyResp = await request.post(
                        `${kashierApiPathData.reset_Password_Verify_Token_Path}/${resetToken}`,
                        {
                            data:
                            {
                                newPassword: testData.invalid_Password_Below_Min,
                                confirmNewPassword: testData.invalid_Password_Below_Min
                            }
                        }
                    )
                    const resetVerifyJson = await resetVerifyResp.json()
                    console.log(resetVerifyJson)
                    expect(resetVerifyResp.status()).toBe(400)
                    expect(resetVerifyJson.message).toBe(testData.short_Password_Min_Length_Error)
                })
            })
    })
