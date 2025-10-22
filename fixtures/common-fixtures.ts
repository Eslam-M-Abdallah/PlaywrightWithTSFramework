import {test as baseTest} from "../fixtures/pom-fixtures"
import commonUtils from "../Utils/commonUtils"

type commonFixtures = 
{
    commonUtils : commonUtils
}

export const test = baseTest.extend<commonFixtures>(
    {
        commonUtils : async({} , use)=>
            {
                const commonUtilsObj = new commonUtils
                use(commonUtilsObj)
            }
    })