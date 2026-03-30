import { test, expect } from "../../fixtures/otpUtils-fixtures"
import passwordCriteriaData from "../../test-data/ui-data/Kashier-password-criteria-data.json"

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

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE BLOCK 1 : Password Length Validation
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria] Password Length Validation Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-01
        test("[TC-01] Verify That Continue Button Stays Disabled When Password Is Less Than 12 Characters",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierRegisterPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Kashier Register Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoRegisterPage()
                })

                //2-
                await test.step("Enter A New Valid Email And Continue To OTP Verification", async () => {
                    await kashierRegisterPage.addNewUserEmail(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierRegisterPage.verifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Enter An 11-Character Password (Below Minimum 12 Characters) In Both Password Fields", async () => {
                    await kashierRegisterPage.registerNewPasswordInput.fill(passwordCriteriaData.invalid_Password_11_Chars)
                    await kashierRegisterPage.registerConfirmNewPasswordInput.fill(passwordCriteriaData.invalid_Password_11_Chars)
                })

                //5-
                await test.step("Ensure That The Continue Button Remains Disabled And Cannot Be Clicked", async () => {
                    await expect(kashierRegisterPage.continueButton).toBeDisabled()
                })
            })

        // TC-02
        test("[TC-02] Verify That System Shows Validation Error When Password Exceeds 60 Characters",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierRegisterPage, kashierOnboardingPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Kashier Register Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoRegisterPage()
                })

                //2-
                await test.step("Enter A New Valid Email And Continue To OTP Verification", async () => {
                    await kashierRegisterPage.addNewUserEmail(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierRegisterPage.verifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Enter A 61-Character Password (Exceeds Maximum 60 Characters) And Proceed To Account Details", async () => {
                    await kashierRegisterPage.createNewPassword(passwordCriteriaData.invalid_Password_61_Chars)
                })

                //5-
                await test.step("Fill In Account Details And Click Create Account", async () => {
                    await kashierRegisterPage.createNewUserAccount(
                        passwordCriteriaData.first_Name,
                        passwordCriteriaData.last_Name,
                        passwordCriteriaData.mobile_Number,
                        passwordCriteriaData.store_Name
                    )
                })

                //6-
                await test.step("Ensure That The System Displays A Maximum Length Validation Error After Submitting", async () => {
                    await expect(kashierRegisterPage.page.getByText(passwordCriteriaData.max_Length_Validation_Error)).toBeVisible()
                })
            })

        // TC-03
        test("[TC-03] Verify That System Accepts A Valid Password Between 12 And 60 Characters And Redirects To Onboarding",
            {
                tag: ["@Password_Criteria", "@Positive_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierRegisterPage, kashierOnboardingPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Kashier Register Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoRegisterPage()
                })

                //2-
                await test.step("Enter A New Valid Email And Continue To OTP Verification", async () => {
                    await kashierRegisterPage.addNewUserEmail(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierRegisterPage.verifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Enter A Valid 12-Character Password That Meets The Length Criteria And Proceed", async () => {
                    await kashierRegisterPage.createNewPassword(passwordCriteriaData.valid_Password_12_Chars)
                })

                //5-
                await test.step("Fill In Account Details And Click Create Account", async () => {
                    await kashierRegisterPage.createNewUserAccount(
                        passwordCriteriaData.first_Name,
                        passwordCriteriaData.last_Name,
                        passwordCriteriaData.mobile_Number,
                        passwordCriteriaData.store_Name
                    )
                })

                //6-
                await test.step("Ensure That The User Is Redirected To The Onboarding Page And The Skip Button Is Visible", async () => {
                    await expect(kashierRegisterPage.page).toHaveURL(new RegExp(passwordCriteriaData.onboarding_Page_URL))
                    await expect(kashierOnboardingPage.skipForNowButton).toBeVisible()
                })
            })
    })

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE BLOCK 2 : Password Validation Across Different Flows
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria] Password Validation Across Registration, Change & Reset Flows",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-04
        test("[TC-04] Verify That Continue Button Stays Disabled When Password Is Less Than 12 Characters During Account Creation",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierRegisterPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Kashier Register Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoRegisterPage()
                })

                //2-
                await test.step("Enter A New Valid Email And Continue To OTP Verification", async () => {
                    await kashierRegisterPage.addNewUserEmail(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierRegisterPage.verifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Enter An Invalid Password Below 12 Characters In Both Password Fields", async () => {
                    await kashierRegisterPage.registerNewPasswordInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                    await kashierRegisterPage.registerConfirmNewPasswordInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                })

                //5-
                await test.step("Ensure That The Continue Button Remains Disabled During Account Creation", async () => {
                    await expect(kashierRegisterPage.continueButton).toBeDisabled()
                })
            })

        // TC-05
        test("[TC-05] Verify That System Shows Validation Error When New Password Is Less Than 12 Characters In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierHomePage, kashierSettingsPage, kashierProfilePage }) => {

                //1-
                await test.step("Login To The Kashier Portal With Valid Credentials", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.loginToKashier(
                        process.env.MAILOSAUR_Test_Email!,
                        process.env.PASSWORD!
                    )
                })

                //2-
                await test.step("Navigate To The Profile Page Via Settings", async () => {
                    await kashierHomePage.openSettingsPage()
                    await kashierSettingsPage.openProfilePage()
                })

                //3-
                await test.step("Open The Change Password Form And Enter Current Password", async () => {
                    await kashierProfilePage.changePasswordButton.click()
                    await kashierProfilePage.currentPasswordInput.fill(process.env.PASSWORD!)
                })

                //4-
                await test.step("Enter An Invalid Password Below 12 Characters In Both New Password Fields And Click Save", async () => {
                    await kashierProfilePage.profileNewPasswordInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                    await kashierProfilePage.profileConfirmNewPasswordInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                    await kashierProfilePage.saveNewPasswordButton.click()
                })

                //5-
                await test.step("Ensure That The System Displays A Minimum Length Validation Error Message", async () => {
                    await expect(kashierProfilePage.page.getByText(passwordCriteriaData.change_Password_Min_Length_Error)).toBeVisible()
                })
            })

        // TC-06
        test("[TC-06] Verify That Save Button Stays Disabled When New Password Is Less Than 12 Characters In Reset Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierResetPasswordPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Forget Password Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoForgetPasswordPage()
                })

                //2-
                await test.step("Enter The Test Email And Request A Password Reset", async () => {
                    await kashierResetPasswordPage.enterEmailToResetPassword(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierResetPasswordPage.resetPasswordverifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Enter An Invalid Password Below 12 Characters In Both Reset Password Fields", async () => {
                    await kashierResetPasswordPage.resetPasswordInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                    await kashierResetPasswordPage.resetPasswordConfirmPassInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                })

                //5-
                await test.step("Ensure That The Change Password Button Remains Disabled", async () => {
                    await expect(kashierResetPasswordPage.resetPasswordChangePassButton).toBeDisabled()
                })
            })
    })

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE BLOCK 3 : Password Policies & Security Rules
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria] Password Policies & Security Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-10
        test("[TC-10] Verify That System Prevents Reuse Of The Last 12 Passwords In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierHomePage, kashierSettingsPage, kashierProfilePage }) => {

                //1-
                await test.step("Login To The Kashier Portal With Valid Credentials", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.loginToKashier(
                        process.env.USER_NAME!,
                        process.env.PASSWORD!
                    )
                })

                //2-
                await test.step("Navigate To The Profile Page Via Settings", async () => {
                    await kashierHomePage.openSettingsPage()
                    await kashierSettingsPage.openProfilePage()
                })

                //3-
                await test.step("Attempt To Change Password Using A Previously Used Password", async () => {
                    await kashierProfilePage.chnageUserPassword(
                        process.env.PASSWORD!,
                        passwordCriteriaData.old_Password_Reused
                    )
                })

                //4-
                await test.step("Ensure That The System Rejects The Reused Password With An Appropriate Error", async () => {
                    await expect(kashierProfilePage.page.getByText(passwordCriteriaData.reused_Password_Error)).toBeVisible()
                })
            })

        // TC-11
        test("[TC-11] Verify That System Blocks Password Change Within 24 Hours Of Last Change",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierHomePage, kashierSettingsPage, kashierProfilePage }) => {

                //1-
                await test.step("Login To The Kashier Portal With Valid Credentials", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.loginToKashier(
                        process.env.MAILOSAUR_Test_Email!,
                        passwordCriteriaData.new_Valid_Password
                    )
                })

                //2-
                await test.step("Navigate To The Profile Page Via Settings", async () => {
                    await kashierHomePage.openSettingsPage()
                    await kashierSettingsPage.openProfilePage()
                })

                //3-
                await test.step("Attempt To Change Password Again Within 24 Hours Of The Last Change", async () => {
                    await kashierProfilePage.chnageUserPassword(
                        passwordCriteriaData.new_Valid_Password,
                        passwordCriteriaData.valid_Password_12_Chars
                    )
                })

                //4-
                await test.step("Ensure That The System Blocks The Change And Shows A 24-Hour Interval Error", async () => {
                    await expect(kashierProfilePage.page.getByText(passwordCriteriaData.min_Change_Interval_Error)).toBeVisible()
                })
            })

        // TC-12
        test("[TC-12] Verify That System Rejects A Password That Is The Same As The Username In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierHomePage, kashierSettingsPage, kashierProfilePage }) => {

                //1-
                await test.step("Login To The Kashier Portal With Valid Credentials", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.loginToKashier(
                        process.env.MAILOSAUR_Test_Email!,
                        passwordCriteriaData.new_Valid_Password
                    )
                })

                //2-
                await test.step("Navigate To The Profile Page Via Settings", async () => {
                    await kashierHomePage.openSettingsPage()
                    await kashierSettingsPage.openProfilePage()
                })

                //3-
                await test.step("Attempt To Set A New Password That Is Identical To The Username/Email", async () => {
                    await kashierProfilePage.chnageUserPassword(
                        passwordCriteriaData.new_Valid_Password,
                        passwordCriteriaData.password_Same_As_Username
                    )
                })

                //4-
                await test.step("Ensure That The System Rejects The Password And Shows A Same-As-Username Error", async () => {
                    await expect(kashierProfilePage.page.getByText(passwordCriteriaData.same_As_Username_Error)).toBeVisible()
                })
            })

        // TC-9 (New)
        test("[TC-9] Verify That System Rejects A Password That Includes The Store Name In Change Password Flow",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierHomePage, kashierSettingsPage, kashierProfilePage }) => {

                //1-
                await test.step("Login To The Kashier Portal With Valid Credentials", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.loginToKashier(
                        process.env.MAILOSAUR_Test_Email!,
                        passwordCriteriaData.new_Valid_Password
                    )
                })

                //2-
                await test.step("Navigate To The Profile Page Via Settings", async () => {
                    await kashierHomePage.openSettingsPage()
                    await kashierSettingsPage.openProfilePage()
                })

                //3-
                await test.step("Attempt To Set A New Password That Contains The User's Store Name", async () => {
                    await kashierProfilePage.chnageUserPassword(
                        passwordCriteriaData.new_Valid_Password,
                        passwordCriteriaData.password_Include_Storename
                    )
                })

                //4-
                await test.step("Ensure That The System Rejects The Password And Shows A Store Name Inclusion Error", async () => {
                    await expect(kashierProfilePage.page.getByText(passwordCriteriaData.include_Storename_Error)).toBeVisible()
                })
            })
    })

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE BLOCK 4 : Account Lockout & Rate Limiting
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria] Account Lockout & Rate Limiting Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-13
        test("[TC-13] Verify That Account Gets Locked After 5 Consecutive Failed Login Attempts",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage }) => {

                //1-
                await test.step("Navigate To The Kashier Login Page", async () => {
                    await kashierLoginPage.gotoKashier()
                })

                //2-
                await test.step("Attempt Login With Wrong Password - Attempt 1", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_1)
                })

                //3-
                await test.step("Attempt Login With Wrong Password - Attempt 2", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_2)
                })

                //4-
                await test.step("Attempt Login With Wrong Password - Attempt 3", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_3)
                })

                //5-
                await test.step("Attempt Login With Wrong Password - Attempt 4", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_4)
                })

                //6-
                await test.step("Attempt Login With Wrong Password - Attempt 5 (Triggering Lockout)", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_5)
                })

                //7-
                await test.step("Ensure That The System Locks The Account And Displays A Lockout Error Message", async () => {
                    await expect(kashierLoginPage.page.getByText(passwordCriteriaData.account_Locked_Error)).toBeVisible()
                })
            })

        // TC-14
        test("[TC-14] Verify That System Triggers Rate Limiting After 5 Consecutive Failed Login Attempts",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage }) => {

                //1-
                await test.step("Navigate To The Kashier Login Page", async () => {
                    await kashierLoginPage.gotoKashier()
                })

                //2-
                await test.step("Attempt Login With Wrong Password - Attempt 1", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_1)
                })

                //3-
                await test.step("Attempt Login With Wrong Password - Attempt 2", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_2)
                })

                //4-
                await test.step("Attempt Login With Wrong Password - Attempt 3", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_3)
                })

                //5-
                await test.step("Attempt Login With Wrong Password - Attempt 4", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_4)
                })

                //6-
                await test.step("Attempt Login With Wrong Password - Attempt 5 (Triggering Rate Limiter)", async () => {
                    await kashierLoginPage.loginToKashier(process.env.MAILOSAUR_Test_Email!, passwordCriteriaData.wrong_Password_Attempt_5)
                })

                //7-
                await test.step("Ensure That The System Displays A Rate Limiting Error Message After The 5th Failed Attempt", async () => {
                    await expect(kashierLoginPage.page.getByText(passwordCriteriaData.rate_Limit_Error)).toBeVisible()
                })
            })
    })

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE BLOCK 5 : Expired & Admin-Reset Password Flows
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria] Expired & Admin-Reset Password Flows",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-08
        test("[TC-08] Verify That User Is Redirected To Reset Password Page When Password Is Expired",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage }) => {

                //1-
                await test.step("Navigate To The Kashier Login Page", async () => {
                    await kashierLoginPage.gotoKashier()
                })

                //2-
                await test.step("Login With An Account That Has An Expired Password", async () => {
                    await kashierLoginPage.loginToKashier(
                        // Need here To Use Credintials For Account With Already Expired Pass
                        process.env.MAILOSAUR_Test_Email!, 
                        passwordCriteriaData.old_Password_Reused
                    )
                })

                //3-
                await test.step("Ensure That The User Is Automatically Redirected To The Reset Password Page", async () => {
                    await expect(kashierLoginPage.page).toHaveURL(new RegExp(passwordCriteriaData.reset_Password_Page_URL))
                })
            })

        // TC-09 (Admin Reset)
        test("[TC-09] Verify That System Shows Force Reset Error Message When User Logs In With Admin-Reset Password",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage }) => {

                //1-
                await test.step("Navigate To The Kashier Login Page", async () => {
                    await kashierLoginPage.gotoKashier()
                })

                //2-
                await test.step("Attempt To Login Using The Temporary Password Set By The Admin", async () => {
                    await kashierLoginPage.loginToKashier(
                        passwordCriteriaData.temp_Email_Admin_Reset,
                        passwordCriteriaData.temp_Password_Admin_Reset
                    )
                })

                //3-
                await test.step("Ensure That The System Blocks Login And Displays The Force Reset Error Message", async () => {
                    await expect(kashierLoginPage.page.getByText(passwordCriteriaData.admin_Reset_Force_Change_Error)).toBeVisible()
                })
            })

        // TC-17
        test("[TC-17] Verify That User Is Redirected To Reset Password Page When API Returns HTTP 423",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, page }) => {

                //1-
                await test.step("Intercept The Login API And Force It To Return HTTP 423", async () => {
                    await page.route(`${process.env.BASE_URL}/api/auth/login`, (route) => {
                        route.fulfill({
                            status: 423,
                            contentType: "application/json",
                            body: JSON.stringify({ message: "Account locked" })
                        })
                    })
                })

                //2-
                await test.step("Navigate To The Kashier Login Page And Attempt To Login", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.loginToKashier(
                        //Need Credintails With Pass Has Already Expired 
                        process.env.MAILOSAUR_Test_Email!,
                        passwordCriteriaData.new_Valid_Password
                    )
                })

                //3-
                await test.step("Ensure That The User Is Redirected To The Reset Password Page Upon 423 Response", async () => {
                    await expect(page).toHaveURL(new RegExp(passwordCriteriaData.reset_Password_Page_URL))
                })
            })
    })

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIBE BLOCK 6 : Real-Time Validation & Confirm Password
// ─────────────────────────────────────────────────────────────────────────────
test.describe("[Password Criteria] Real-Time Validation & Confirm Password Rules",
    {
        tag: "@Password_Criteria",
        annotation:
        {
            type: "Story Jira Link",
            description: "https://your_Jira_Story_Link_URL"
        }
    }, () => {

        // TC-18
        test("[TC-18] Verify That Continue Button Stays Disabled With Real-Time Feedback While Typing Invalid Password",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierRegisterPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Kashier Register Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoRegisterPage()
                })

                //2-
                await test.step("Enter A New Valid Email And Continue To OTP Verification", async () => {
                    await kashierRegisterPage.addNewUserEmail(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierRegisterPage.verifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Start Typing An Invalid Password Below 12 Characters Without Submitting", async () => {
                    await kashierRegisterPage.registerNewPasswordInput.fill(passwordCriteriaData.invalid_Password_Below_Min)
                })

                //5-
                await test.step("Ensure That The Continue Button Is Disabled As Real-Time Validation Kicks In While Typing", async () => {
                    await expect(kashierRegisterPage.continueButton).toBeDisabled()
                })
            })

        // TC-19
        test("[TC-19] Verify That Continue Button Stays Disabled On Password Mismatch And Redirects To Onboarding On Match",
            {
                tag: ["@Password_Criteria", "@Negative_Scenario", "@Ui", "@Staging_Env"],
                annotation:
                {
                    type: "Tc Jira Link",
                    description: "https://your_Jira_TC_Link_URL"
                }
            }, async ({ kashierLoginPage, kashierRegisterPage, kashierOnboardingPage, otpUtils }) => {

                //1-
                await test.step("Navigate To The Kashier Register Page", async () => {
                    await kashierLoginPage.gotoKashier()
                    await kashierLoginPage.gotoRegisterPage()
                })

                //2-
                await test.step("Enter A New Valid Email And Continue To OTP Verification", async () => {
                    await kashierRegisterPage.addNewUserEmail(process.env.MAILOSAUR_Test_Email!)
                })

                //3-
                await test.step("Verify The OTP Code Sent To The Test Email", async () => {
                    await kashierRegisterPage.verifyOtpCode(otpUtils)
                })

                //4-
                await test.step("Enter A Valid Password But Fill The Confirm Password Field With A Mismatching Value", async () => {
                    await kashierRegisterPage.registerNewPasswordInput.fill(passwordCriteriaData.valid_Password_12_Chars)
                    await kashierRegisterPage.registerConfirmNewPasswordInput.fill(passwordCriteriaData.mismatch_Confirm_Password)
                })

                //5-
                await test.step("Ensure That The Continue Button Remains Disabled Due To Password Mismatch", async () => {
                    await expect(kashierRegisterPage.continueButton).toBeDisabled()
                })

                //6-
                await test.step("Correct The Confirm Password Field To Match The Password And Submit", async () => {
                    await kashierRegisterPage.registerConfirmNewPasswordInput.fill(passwordCriteriaData.valid_Password_12_Chars)
                    await kashierRegisterPage.continueButton.click()
                })

                //7-
                await test.step("Fill In Account Details And Click Create Account", async () => {
                    await kashierRegisterPage.createNewUserAccount(
                        passwordCriteriaData.first_Name,
                        passwordCriteriaData.last_Name,
                        passwordCriteriaData.mobile_Number,
                        passwordCriteriaData.store_Name
                    )
                })

                //8-
                await test.step("Ensure That The User Is Redirected To The Onboarding Page And The Skip Button Is Visible", async () => {
                    await expect(kashierRegisterPage.page).toHaveURL(new RegExp(passwordCriteriaData.onboarding_Page_URL))
                    await expect(kashierOnboardingPage.skipForNowButton).toBeVisible()
                })
            })
    })