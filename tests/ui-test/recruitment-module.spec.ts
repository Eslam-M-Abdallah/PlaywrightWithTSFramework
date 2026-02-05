import { test, expect } from "../../fixtures/hooks-fixtures"
import recruitmentModuleData from "../../test-data/ui-data/recruitment-module-data.json"

test("[Recruitment] Verify Add New Vacancy Is Successfully created Under The Recruitment Module",
    {
        tag: ['@Recruitment_Module', '@Positive_Scenario', '@Ui', '@Demo_Env'],
        annotation:
        {
            type: "Tc Jira Link",
            description: "The Link Is Here"
        }
    }, async ({ gotoUrl, sideMenuPage, recruitmentPage, page }) => {
    //1
    await test.step("Open The Recruitment Module", async () => {
        await sideMenuPage.openRecruitmentModule()
    })

    //2 
    await test.step("Add New Vacancy In Recruitment Module", async () => {
        await test.setTimeout(60_000)
        await recruitmentPage.openVacanciesTab()
        await test.setTimeout(10000)
        await recruitmentPage.openAddVacanyForm()
        await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy")
        await test.setTimeout(10000)
        await page.getByRole('textbox', { name: 'Type description here' }).waitFor();
        await recruitmentPage.addNewVacancy(recruitmentModuleData.vacancy_name, recruitmentModuleData.vacancy_description, recruitmentModuleData.hiring_Manager, recruitmentModuleData.number_Of_Positions)
    })

    //3
    await test.step("Ensure That The New Vacancy Added Successfully Under The PIM Module", async () => {
        await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy/13")

        await expect(recruitmentPage.editVacancyHeader).toHaveText(recruitmentModuleData.edit_Vacanct_Text)
    })
})