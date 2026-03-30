import { test as baseTest } from "@playwright/test"
import { loginPage } from "../pages/loginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { UserPage } from "../pages/UserPage"
import { SideMenuPage } from "../pages/SideMenuPage"
import { PimPage } from "../pages/PimPage"
import { RecruitmentPage } from "../pages/RecruitmentPage"
import { KashierLoginPage } from "../pages/KashierLoginPage"
import { KashierRegisterPage } from "../pages/KashierRegisterPage"
import { KashierOnboardingPage } from "../pages/KashierOnboardingPage"
import { KashierHomePage } from "../pages/KashierHomePage"
import { KashierSettingsPage } from "../pages/KashierSettingsPage"
import { KashierProfilePage } from "../pages/KashierProfilePage"
import { KashierResetPasswordPage } from "../pages/KashierResetPasswordPage"

type pomFixturesType =
    {
        loginPage: loginPage
        dasboardPage: DashboardPage
        userPage: UserPage
        sideMenuPage: SideMenuPage
        pimPage: PimPage
        recruitmentPage: RecruitmentPage
        kashierLoginPage : KashierLoginPage
        kashierRegisterPage : KashierRegisterPage
        kashierOnboardingPage : KashierOnboardingPage
        kashierHomePage : KashierHomePage
        kashierSettingsPage : KashierSettingsPage
        kashierProfilePage : KashierProfilePage
        kashierResetPasswordPage : KashierResetPasswordPage
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
        kashierLoginPage : async({page} ,use)=> {
            await use(new KashierLoginPage(page))
        },
        kashierRegisterPage : async({page},use)=>{
            await use(new KashierRegisterPage(page))
        },
        kashierOnboardingPage : async({page},use)=>{
            await use(new KashierOnboardingPage(page))
        },
        kashierHomePage : async({page},use)=>{
            await use(new KashierHomePage(page))
        },
        kashierSettingsPage : async({page},use)=>{
            await use(new KashierSettingsPage(page))
        },
        kashierProfilePage  :async({page},use)=>{
            await use(new KashierProfilePage(page))
        },
        kashierResetPasswordPage : async({page},use)=>{
            await use(new KashierResetPasswordPage(page))
        }

    })