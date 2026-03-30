import { Locator, Page } from "@playwright/test";

export class KashierSettingsPage
{
    readonly page : Page 
    readonly profileLink  : Locator

    constructor (page : Page) 
    {
        this.page = page
        this.profileLink = page.locator('a').filter({ hasText: 'Profile Personal details,' })
    }
    /**
     * To Navigate/Open User Profile Page
     */
    async openProfilePage()
    {
        await this.profileLink.click()
    }

}