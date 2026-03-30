import { Locator, Page } from "@playwright/test";

export class KashierHomePage 
{
    readonly page : Page 
    readonly settingsIconButton : Locator
    readonly storeName : Locator 

    constructor (page : Page) 
    {
        this.page = page
        this.settingsIconButton = page.getByRole('img', { name: 'gear' })
        this.storeName = page.getByText('Connected').first()
    }
    /**
     * To Navigate/OPen The Settings Page
     */
    async openSettingsPage()
    {
        await this.settingsIconButton.click()
    }

}