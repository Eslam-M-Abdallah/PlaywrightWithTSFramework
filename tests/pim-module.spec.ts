import { test, expect } from "../fixtures/hooks-fixtures"
import pimModuleData from "../test-data/pim-module-data.json"

test("[Pim] Verify Add New Employee Is Successfully created Under The Pim Module",
    {
        tag: ['@Pim_Module', '@Positive_Scenario', '@Ui', '@Demo_Env']
        , annotation:
        {
            type: 'Tc Jira Link',
            description: 'https://your_Jira_link_URL'
        }
    }, async ({ gotoUrl, sideMenuPage, pimPage }) => {

        //1-
        await test.step("Open The PIM Module ", async () => {
            await sideMenuPage.openPimModule()
        })
        //2-
        await test.step("Add New Employee In PIM Module ", async () => {
            test.setTimeout(60_000)
            await pimPage.addNewEmployee(pimModuleData.first_name, pimModuleData.middle_name, pimModuleData.last_name)
        })
        //3-
        await test.step("Ensure That The New Employee Added Successfully Under The PIM Module", async () => {
            await expect(pimPage.newEmployeeNameHeading).toHaveText(`${pimModuleData.first_name} ${pimModuleData.last_name}`)
        })

    })