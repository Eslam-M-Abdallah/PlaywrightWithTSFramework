import { Locator, Page } from "@playwright/test";

export class KashierOnboardingPage 
{
    readonly page : Page 
    readonly skipForNowButton : Locator

    constructor (page : Page) 
    {
        this.page = page
        this.skipForNowButton = page.getByRole('button', { name: 'Skip for now' }).first()
    }
    /**
     * To Skip Onboarding Steps After Registration
     */
    async skipOnbaordingPage()
    {
        await this.skipForNowButton.click()
    }

}