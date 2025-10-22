import { Locator, Page } from "@playwright/test"

export class SideMenuPage {
    readonly page: Page
    readonly pimLink: Locator
    readonly orengeHrmLogo : Locator
    readonly sidePanel : Locator

    constructor(page: Page) {
        this.page = page
        this.pimLink = page.getByRole('link', { name: 'PIM' })
        this.orengeHrmLogo = page.getByRole('link', { name: 'client brand banner' })
        this.sidePanel = page.getByLabel('Sidepanel').locator('div').filter({ hasText: 'AdminPIMLeaveTimeRecruitmentMy' })
    }

    /**
     * To Open The Pim Module
     */
    async openPimModule() {
        this.pimLink.click()
    }
}