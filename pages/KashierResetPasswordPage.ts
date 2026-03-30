import { Locator, Page } from "../fixtures/otpUtils-fixtures";
import OtpUtils from "../Utils/otpUtils";

export class KashierResetPasswordPage {
    readonly page: Page
    readonly resetPasswordEmailInput: Locator
    readonly resetButton: Locator
    readonly digit1: Locator
    readonly digit2: Locator
    readonly digit3: Locator
    readonly digit4: Locator
    readonly resetPasswordVerifyOtpButton: Locator
    readonly resetPasswordResendOtpButton: Locator
    readonly resetPasswordBackButton: Locator
    readonly resetPasswordInput: Locator
    readonly resetPasswordConfirmPassInput: Locator
    readonly resetPasswordChangePassButton: Locator

    constructor(page: Page) {
        this.page = page
        this.resetPasswordEmailInput = page.getByRole('textbox', { name: 'Email' })
        this.resetButton = page.getByRole('button', { name: 'Reset' })
        this.digit1 = page.getByRole('textbox').first()
        this.digit2 = page.getByRole('textbox').nth(1)
        this.digit3 = page.getByRole('textbox').nth(2)
        this.digit4 = page.getByRole('textbox').nth(3)
        this.resetPasswordVerifyOtpButton = page.getByRole('button', { name: 'Verify' })
        this.resetPasswordResendOtpButton = page.getByRole('button', { name: 'Resend' })
        this.resetPasswordBackButton = page.getByRole('heading', { name: 'Back' })
        this.resetPasswordInput = page.getByRole('textbox', { name: 'Password', exact: true })
        this.resetPasswordConfirmPassInput = page.getByRole('textbox', { name: 'Confirm Password' })
        this.resetPasswordChangePassButton = page.getByRole('textbox', { name: 'Confirm Password' })
    }
    /**
     * To Enter The Email That Want To Reset It's password
     * @param resetPasswordEmail
     */
    async enterEmailToResetPassword(resetPasswordEmail: string) {
        await this.resetPasswordEmailInput.fill(resetPasswordEmail)
        await this.resetButton.click()
    }
    /**
     * To Verify The Reset Password OTP Code 
     * @param otpUtils 
     */
    async resetPasswordverifyOtpCode(otpUtils: OtpUtils) {
        const testEmail = process.env.MAILOSAUR_Test_Email!;
        const otpCode = await otpUtils.getLatestOtp(testEmail)
        const { digit1, digit2, digit3, digit4 } = await otpUtils.splitOtp(otpCode)
        console.log(digit1, digit2, digit3, digit4)
        await this.digit1.fill(`${digit1}`)
        await this.digit2.fill(`${digit2}`)
        await this.digit3.fill(`${digit3}`)
        await this.digit4.fill(`${digit4}`)
        await this.resetPasswordVerifyOtpButton.click()
    }

    async resetUserPassword(resetPassword : string)
    {
        await this.resetPasswordInput.fill(resetPassword)
        await this.resetPasswordConfirmPassInput.fill(resetPassword)
        await this.resetPasswordChangePassButton.click()
    }

}