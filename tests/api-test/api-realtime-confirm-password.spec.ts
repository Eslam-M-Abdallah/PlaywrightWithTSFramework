import { test, expect } from "../../fixtures/hooks-fixtures"
import kashierApiPathData from "../../test-data/api-data/api-kashier-path-data.json"
import testData from "../../test-data/api-data/api-realtime-confirm-password-data.json"

// ─────────────────────────────────────────────────────────────────────────────
// Real-Time Validation & Confirm Password — TC-18 | TC-19
// Account used : 42hiqkagau@wnbaldwy.com  (signup OTP only, no auth)
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria - API] Real-Time Validation & Confirm Password Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-18
        test("[TC-18] Verify That API Returns Min Length Error When Password Below Minimum Is Submitted During Registration",
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
                await test.step("Submit Registration Request With Invalid Password Below 12 Characters And Verify API Returns Min Length Validation Error", async () => {
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

        // TC-19
        test("[TC-19] Verify That API Returns Mismatch Error For Non-Matching Passwords And Accepts Valid Matching Passwords During Registration",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Api", "@Staging_Env"],
                annotation: { type: "Tc Jira Link", description: "https://your_Jira_TC_Link_URL" }
            }, async ({ request }) => {

                //1-
                let otpCode: string = ""
                await test.step("Send OTP Generation Request For Test Email And Extract OTP Code From API Response", async () => {
                    const otpGenerateResp = await request.post(kashierApiPathData.otp_Generate_Signup_Path, {
                        data: { key: testData.signup_Test_Email }
                    })
                    const otpGenerateJson = await otpGenerateResp.json()
                    console.log(otpGenerateJson)
                    expect(otpGenerateResp.status()).toBe(201)
                    otpCode = otpGenerateJson.code
                })

                //2-
                await test.step("Submit Registration Request With Mismatching Password And Confirm Password And Verify API Returns Mismatch Error", async () => {
                    const registerMismatchResp = await request.post(kashierApiPathData.register_Path, {
                        data:
                        {
                            signupKey: testData.signup_Test_Email,
                            password: testData.valid_Password_12_Chars,
                            firstName: testData.first_Name,
                            lastName: testData.last_Name,
                            mobileNumber: testData.mobile_Number,
                            storeName: testData.store_Name,
                            countryCode: testData.country_Code
                        }
                    })
                    const registerMismatchJson = await registerMismatchResp.json()
                    console.log(registerMismatchJson)
                    expect(registerMismatchResp.ok()).toBeFalsy()
                    expect(registerMismatchJson.message).toBe(testData.confirm_Password_Error)
                })

                //3-
                await test.step("Send OTP Verification Request Using The Code From API Response To Obtain Registration Session", async () => {
                    const otpVerifyResp = await request.post(kashierApiPathData.otp_Verify_Signup_Path, {
                        data: { key: testData.signup_Test_Email, code: otpCode }
                    })
                    const otpVerifyJson = await otpVerifyResp.json()
                    console.log(otpVerifyJson)
                    expect(otpVerifyResp.ok()).toBeTruthy()
                })

                //4-
                await test.step("Submit Registration Request With Correct Matching Passwords And Verify Successful API Response", async () => {
                    const registerResp = await request.post(kashierApiPathData.register_Path, {
                        data:
                        {
                            signupKey: testData.signup_Test_Email,
                            password: testData.valid_Password_12_Chars,
                            firstName: testData.first_Name,
                            lastName: testData.last_Name,
                            mobileNumber: testData.mobile_Number,
                            storeName: testData.store_Name,
                            countryCode: testData.country_Code
                        }
                    })
                    const registerJson = await registerResp.json()
                    console.log(registerJson)
                    expect(registerResp.ok()).toBeTruthy()
                    expect(registerJson).not.toBeNull()
                })
            })
    })
