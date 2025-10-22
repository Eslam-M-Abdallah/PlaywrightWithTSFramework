import { Locator, Page } from "@playwright/test";

export class loginPage 
{
    readonly page : Page 
    readonly userNameInput : Locator 
    readonly passwordInput : Locator
    readonly loginButton : Locator
    readonly invalidCredintilasErrorPopup : Locator 

    constructor(page : Page) 
    {
        this.page = page 
        this.userNameInput = page.getByRole('textbox', { name: 'Username' }) 
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.invalidCredintilasErrorPopup = page.getByRole('alert') 
    }

    /**
     * To Open The URL Into Browser
     */

    async goToOrangeHrm()
    {
        await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`)
    }

    /**
     * To Login Into The OpenHrm Application
     * @param userName 
     * @param password 
     */

    async loginToOrangeHrm(userName : string , password : string)
    {
        await this.userNameInput.fill(userName)
        await this.passwordInput.fill(password)
        await this.loginButton.click() 
    }
}