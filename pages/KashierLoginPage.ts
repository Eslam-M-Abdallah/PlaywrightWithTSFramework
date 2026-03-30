import { Locator, Page } from "@playwright/test";

export class KashierLoginPage 
{
    readonly page : Page 
    readonly emailInput : Locator
    readonly PasswordInput : Locator 
    readonly loginButton : Locator
    readonly forgetPasswordButton : Locator
    readonly registerButton : Locator

    constructor (page : Page) 
    {
        this.page = page
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.PasswordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.forgetPasswordButton = page.getByRole('link', { name: 'Forgot Password?' })
        this.registerButton = page.getByRole('link', { name: 'Register' })
    }
    /**
     * To Open The Kashier URL Into Browser
     */
    async gotoKashier()
    {
        await this.page.goto(`${process.env.BASE_URL}/en/login`)
    }
    /**
     * To Login Into The Kashier Portal
     */
    async loginToKashier(email : string , password : string)
    {
        await this.emailInput.fill(email)
        await this.PasswordInput.fill(password)
        await this.loginButton.click() 
    }
    /**
     * To Open The Forget Password Form 
     */
    async gotoForgetPasswordPage()
    {
        await this.forgetPasswordButton.click()
    }
    /**
     * To Open The Register Page
     */
    async gotoRegisterPage ()
    {
        await this.registerButton.click
    }
}