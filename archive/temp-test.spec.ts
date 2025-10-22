
import { test } from "../fixtures/hooks-fixtures"
import { expect } from '@playwright/test'

/* test.beforeEach("Before Each Test Run",async({loginPage})=>
    {
        await loginPage.goToOrangeHrm()
    })

test.afterEach("After Each Test Run",async({userPage})=>
    {
        await userPage.logOut()
    }) */

/* test('temp test By Using The Class Object Directly ', async ({ page }) => {
    console.log(process.env.BASE_URL)
    console.log(process.env.USER_NAME)
    console.log(process.env.PASSWORD)

    const loginPageObject = new loginPage(page)
    test.setTimeout(60_000);
    await loginPageObject.goToOrangeHrm()
    test.setTimeout(60_000);
}) */

test('temp test By Using The pom Fixture  ', async ({ page, gotoUrl }) => {
    test.setTimeout(60_000);
    console.log(page.title())
    await expect(page).toHaveTitle("OrangeHRM")
})

test('Test Temp 1', async ({ page, gotoUrl }) => {
    test.setTimeout(60_000);
    console.log(page.title())
    await expect(page).toHaveTitle("OrangeHRM")
})

test("Test Temp 2", async ({ page, gotoUrl , logout}) => {
    test.setTimeout(60_000);
    await page.getByRole('link', { name: 'Admin' }).click()
    test.setTimeout(60_000);
    await expect(page).toHaveTitle("OrangeHRM")
})