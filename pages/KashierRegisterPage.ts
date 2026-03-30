import { Locator, Page } from "../fixtures/otpUtils-fixtures";
import OtpUtils from "../Utils/otpUtils";

export class KashierRegisterPage 
{
    readonly page: Page
    readonly newEmailInput: Locator
    readonly continueButton: Locator
    readonly digit1: Locator
    readonly digit2: Locator
    readonly digit3: Locator
    readonly digit4: Locator
    readonly registeVerifyOtpButton: Locator
    readonly registerResendOtpButton: Locator
    readonly registerBackButton: Locator
    readonly registerNewPasswordInput: Locator
    readonly registerConfirmNewPasswordInput: Locator
    readonly eyeIcon: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly mobileNumberInput: Locator
    readonly countryCodeDropdownList: Locator
    readonly storeNameInput: Locator
    readonly createAccountButton: Locator


    constructor(page: Page) {
        this.page = page
        this.newEmailInput = page.getByRole('textbox', { name: 'Email' })
        this.digit1 = page.getByRole('textbox').first()
        this.digit2 = page.getByRole('textbox').nth(1)
        this.digit3 = page.getByRole('textbox').nth(2)
        this.digit4 = page.getByRole('textbox').nth(3)
        this.registeVerifyOtpButton = page.getByRole('button', { name: 'Verify' })
        this.registerResendOtpButton = page.getByRole('button', { name: 'Resend' })
        this.registerBackButton = page.getByRole('heading', { name: 'Back' })
        this.registerNewPasswordInput = page.getByRole('textbox', { name: 'Password', exact: true })
        this.registerConfirmNewPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.eyeIcon = page.getByRole('img', { name: 'eye' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.mobileNumberInput = page.getByPlaceholder('Enter your mobile number')
        this.countryCodeDropdownList = page.locator('#countryFilter')
        this.storeNameInput = page.getByRole('textbox', { name: 'Store Name' })
        this.createAccountButton = page.getByRole('button', { name: 'Create account' })


    }
    /**
     * To Enter The New User Email And Continue
     * @param newEmail 
     */
    async addNewUserEmail(newEmail: string) {
        await this.newEmailInput.fill(newEmail)
        await this.continueButton.click()
    }
   /**
    * To Verify The OTP Code 
    * @param otpUtils 
    */
    async verifyOtpCode(otpUtils: OtpUtils) {
        const testEmail = process.env.MAILOSAUR_Test_Email!;
        const otpCode = await otpUtils.getLatestOtp(testEmail)
        const { digit1, digit2, digit3, digit4 } = await otpUtils.splitOtp(otpCode)
        console.log(digit1, digit2, digit3, digit4)
        await this.digit1.fill(`${digit1}`)
        await this.digit2.fill(`${digit2}`)
        await this.digit3.fill(`${digit3}`)
        await this.digit4.fill(`${digit4}`)
        await this.registeVerifyOtpButton.click()
    }
    /**
     * To Resend The OTP Code Again After 30 Seconds CoolDown
     */
    async resendOTPCode()
    {
        await this.registerResendOtpButton.click()
    }
    /**
     * To Create New Pass During Registration
     * @param newPass 
     */
    async createNewPassword(newPass : string)
    {
        await this.registerNewPasswordInput.fill(newPass)
        await this.registerConfirmNewPasswordInput.fill(newPass)
        await this.continueButton.click()
    }
    /**
     * To Show The Entered Password 
     */
    async showPassword()
    {
        await this.eyeIcon.click()
    }
    /**
     * To Create/Register New User Account 
     * @param firstName 
     * @param lastName 
     * @param mobileNumber 
     * @param storeName 
     */
    async createNewUserAccount(firstName : string , lastName : string , mobileNumber : string , storeName : string )
    {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.mobileNumberInput.fill(mobileNumber)
        await this.storeNameInput.fill(storeName)
        await this.createAccountButton.click()
    }
}