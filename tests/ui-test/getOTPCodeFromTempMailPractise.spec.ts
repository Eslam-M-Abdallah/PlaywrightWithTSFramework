import { test, expect } from "../../fixtures/otpUtils-fixtures"


test.use(
    {
        storageState:
        {
            cookies: [],
            origins: []
        }
    })

test("Practise To Get OTP Code From From Temp Mail ", 
    {
        tag : "@OTPtest"
    } , async ({ page, otpUtils }) => {

    const testEmail = process.env.MAILOSAUR_Test_Email!;


    await page.goto("https://portal.staging.payformance.io/en/login")
    await page.getByRole('textbox', { name: 'Email' }).fill("duck-folks@sf7hlyvl.mailosaur.net")
    await page.getByRole('textbox', { name: 'Password' }).fill("Password500$$")
    await page.locator('k-button').click();





    const otpCode = await otpUtils.getLatestOtp(testEmail);





    const { digit1, digit2, digit3, digit4 } = otpUtils.splitOtp(otpCode);
    console.log(digit1, digit2, digit3, digit4);

    await page.getByRole('textbox').first().fill(`${digit1}`)
    await page.getByRole('textbox').nth(1).fill(`${digit2}`)
    await page.getByRole('textbox').nth(2).fill(`${digit3}`)
    await page.getByRole('textbox').nth(3).fill(`${digit4}`)
    await page.locator('k-button').filter({ hasText: 'Verify' }).press("Enter")
    await page.locator('k-button').filter({ hasText: 'Verify' }).click()
    await expect(page).toHaveURL(/dashboard/);

})