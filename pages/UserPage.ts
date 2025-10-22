import { Locator, Page } from "@playwright/test"

export class UserPage 
{
    readonly page : Page  
    readonly userDropdownMenu : Locator
    readonly logOutButton : Locator

    constructor(page : Page)
    {
        this.page = page 
        this.userDropdownMenu = page.locator('.oxd-userdropdown-tab')
        this.logOutButton = page.getByRole('menuitem', { name: 'Logout' })
    }

    async logOut()
    {
        await this.userDropdownMenu.click()
        await this.logOutButton.click()
    }

}