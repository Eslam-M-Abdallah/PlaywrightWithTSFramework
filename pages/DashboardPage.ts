import { Locator, Page } from "@playwright/test";

export class DashboardPage 
{
    readonly page : Page 
    readonly dashboardTitletxt : Locator

    constructor(page : Page)
    {
        this.page = page 
        this.dashboardTitletxt = page.getByRole('heading', { name: 'Dashboard' }) 
    }

    
}


