import { test as baseTest } from "@playwright/test"
import { loginPage } from "../pages/loginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { UserPage } from "../pages/UserPage"
import { SideMenuPage } from "../pages/SideMenuPage"
import { PimPage } from "../pages/PimPage"
import { RecruitmentPage } from "../pages/RecruitmentPage"

type pomFixturesType =
    {
        loginPage: loginPage
        dasboardPage: DashboardPage
        userPage: UserPage
        sideMenuPage: SideMenuPage
        pimPage: PimPage
        recruitmentPage: RecruitmentPage
    }

export const test = baseTest.extend<pomFixturesType>(
    {
        loginPage: async ({ page }, use) => {
            const loginPageObj = new loginPage(page)
            await use(loginPageObj)
        },

        dasboardPage: async ({ page }, use) => {
            await use(new DashboardPage(page))
        },

        userPage: async ({ page }, use) => {
            await use(new UserPage(page))
        },
        sideMenuPage: async ({ page }, use) => {
            await use(new SideMenuPage(page))
        },
        pimPage: async ({ page }, use) => {
            await use(new PimPage(page))
        },
        recruitmentPage: async ({ page }, use) => {
            await use(new RecruitmentPage(page))
        },

    })