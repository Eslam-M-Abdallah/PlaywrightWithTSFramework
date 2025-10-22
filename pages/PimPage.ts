import { Locator, Page } from "@playwright/test";

export class PimPage
{
    readonly page : Page
    readonly addPimButton : Locator
    readonly firstNameInputText : Locator
    readonly middleNameInputText : Locator
    readonly lastNameinputText : Locator
    readonly saveButton : Locator 
    readonly newEmployeeNameHeading : Locator

    constructor(page : Page)
    {
        this.page = page
        this.addPimButton = page.getByRole('button', { name: ' Add' })
        this.firstNameInputText = page.getByRole('textbox', { name: 'First Name' })
        this.middleNameInputText = page.getByRole('textbox', { name: 'Middle Name' })
        this.lastNameinputText = page.getByRole('textbox', { name: 'Last Name' })
        this.saveButton = page.getByRole('button', { name: 'Save' }) 
        this.newEmployeeNameHeading = page.locator(".orangehrm-edit-employee-name")
    }

    /**
     * To Add New Emplyee At The Pim Module
     * @param firstName firstName
     * @param middleName middleName
     * @param lastName lastName
     */
    async addNewEmployee(firstName : string ,middleName : string , lastName : string )
    {
        await this.addPimButton.click()
        await this.firstNameInputText.fill(firstName) 
        await this.middleNameInputText.fill(middleName)
        await this.lastNameinputText.fill(lastName)
        await this.saveButton.click()
    }
}