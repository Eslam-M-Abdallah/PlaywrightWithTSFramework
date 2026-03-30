import { Locator, Page } from "@playwright/test";

export class KashierProfilePage
{
    readonly page : Page 
    readonly changePasswordButton : Locator
    readonly currentPasswordInput : Locator
    readonly profileNewPasswordInput : Locator
    readonly profileConfirmNewPasswordInput : Locator
    readonly saveNewPasswordButton : Locator
    readonly cancelButton : Locator

    constructor (page : Page) 
    {
        this.page = page
        this.changePasswordButton = page.getByRole('button', { name: 'Change password' })
        this.currentPasswordInput = page.getByRole('textbox', { name: 'Current Password' })
        this.profileNewPasswordInput = page.getByRole('textbox', { name: 'New Password' })
        this.profileConfirmNewPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })
        this.saveNewPasswordButton = page.getByRole('button', { name: 'Save New Password' })
        this.cancelButton = page.getByRole('button', { name: 'cancel' })
    }
    /**
     * To Change The User Password 
     * @param currentPassword 
     * @param profileNewPassword 
     */
    async chnageUserPassword(currentPassword : string , profileNewPassword : string)
    {
        await this.changePasswordButton.click()
        await this.currentPasswordInput.fill(currentPassword)
        await this.profileNewPasswordInput.fill(profileNewPassword)
        await this.profileConfirmNewPasswordInput.fill(profileNewPassword)
        await this.saveNewPasswordButton.click()
    }
}