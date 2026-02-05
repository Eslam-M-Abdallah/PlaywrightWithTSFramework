import { Locator, Page } from "@playwright/test";
import { TIMEOUT } from "dns";

export class RecruitmentPage
{
    readonly page : Page
    readonly vacanciesTab : Locator
    readonly addVacancyButton : Locator
    readonly vacancyNameInput : Locator
    readonly jobTitleDropdownList : Locator
    readonly descriptionTxtArea : Locator
    readonly hiringManagerInput : Locator
    readonly numberOfPositionsInput : Locator
    readonly SaveVacancyButton : Locator
    readonly editVacancyHeader : Locator
    readonly jobTitleOption : Locator
    readonly hiringManagerOption : Locator


    constructor(page : Page)
    {
        this.page = page
        this.vacanciesTab = page.getByRole('link', { name: 'Vacancies' })
        this.addVacancyButton = page.getByRole('button', { name: ' Add' })
        this.vacancyNameInput = page.getByRole('textbox').nth(1)
        this.jobTitleDropdownList = page.locator('form i').first()
        this.descriptionTxtArea = page.getByRole('textbox', { name: 'Type description here' })
        this.hiringManagerInput = page.getByRole('textbox', { name: 'Type for hints...' })
        this.numberOfPositionsInput = page.getByRole('textbox').nth(4)
        this.SaveVacancyButton = page.getByRole('button', { name: 'Save' })
        this.editVacancyHeader = page.getByRole('heading', { name: 'Edit Vacancy' })
        this.jobTitleOption = page.getByText('Account Assistant')
        this.hiringManagerOption = page.getByText('Ranga Akunuri')

    }
    /**
     * To Open The Vacancies Tab
     */
    async openVacanciesTab () 
    {
        await this.vacanciesTab.click()
    }
    /***
     * To oPen The Add Vacancy Creation Form 
     */
    async openAddVacanyForm() 
    {
        await this.addVacancyButton.click()

    }

    async addNewVacancy(VacancyName : string , VacancyDescription : string , HiringManagerName : string , NumberOfPositions : string) 
    {
        await this.vacancyNameInput.fill(VacancyName)
        await this.jobTitleDropdownList.click()
        await this.jobTitleOption.click()
        await this.descriptionTxtArea.fill(VacancyDescription)
        await this.hiringManagerInput.fill(HiringManagerName , {timeout : 5000})
        await this.page.getByText('Ranga Akunuri').waitFor();
        await this.hiringManagerOption.click()
        await this.numberOfPositionsInput.fill(NumberOfPositions)
        await this.SaveVacancyButton.click()
    }
}