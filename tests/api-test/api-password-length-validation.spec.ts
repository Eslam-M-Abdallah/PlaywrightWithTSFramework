import { test, expect } from "../../fixtures/hooks-fixtures"
import kashierApiPathData from "../../test-data/api-data/api-kashier-path-data.json"
import testData from "../../test-data/api-data/api-password-length-data.json"

// ─────────────────────────────────────────────────────────────────────────────
// Password Length Validation — TC-01 | TC-02 | TC-03
// Account used : 42hiqkagau@wnbaldwy.com  (signup OTP only, no auth)
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria - API] Password Length Validation Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-01
        test("[TC-01] Verify That API Returns Min Length Error When Registration Password Is Less Than 12 Characters",
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
                await test.step("Submit Registration Request With 11-Character Password And Verify API Returns Min Length Error", async () => {
                    const registerResp = await request.post(kashierApiPathData.register_Path, {
                        data:
                        {
                            signupKey: testData.signup_Test_Email,
                            password: testData.invalid_Password_11_Chars,
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

        // TC-02
        test("[TC-02] Verify That API Returns Max Length Error When Registration Password Exceeds 60 Characters",
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
                await test.step("Submit Registration Request With 61-Character Password And Verify API Returns Max Length Error", async () => {
                    const registerResp = await request.post(kashierApiPathData.register_Path, {
                        data:
                        {
                            signupKey: testData.signup_Test_Email,
                            password: testData.invalid_Password_61_Chars,
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
                    expect(registerJson.message).toBe(testData.max_Length_Validation_Error)
                })
            })

        // TC-03
        test("[TC-03] Verify That API Successfully Registers User When Password Is Between 12 And 60 Characters And Returns Valid Response",
            {
                tag: ["@Password_Criteria", "@Positive_Scenario", "@Api", "@Staging_Env"],
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
                await test.step("Send OTP Verification Request Using The Code From API Response", async () => {
                    const otpVerifyResp = await request.post(kashierApiPathData.otp_Verify_Signup_Path, {
                        data: { key: testData.signup_Test_Email, code: otpCode }
                    })
                    const otpVerifyJson = await otpVerifyResp.json()
                    console.log(otpVerifyJson)
                    expect(otpVerifyResp.ok()).toBeTruthy()
                })

                //3-
                await test.step("Submit Registration Request With Valid 12-Character Password And Verify Successful API Response", async () => {
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
