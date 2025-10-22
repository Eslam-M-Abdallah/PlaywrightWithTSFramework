import { test as baseTest } from "./common-fixtures";


type hooksFixturesType = {
  gotoUrl: void;
  logout: void;
};

/* export const test = baseTest.extend<hooksFixturesType>({
  gotoUrl: async ({ loginPage }, use) => {
    await loginPage.goToOrangeHrm();
    await use();
  },

  logout: async ({ userPage }, use) => {
    await use();
    await userPage.logOut();
  },
});
 */

export const test = baseTest.extend<hooksFixturesType>(
  {
    gotoUrl: async ({ loginPage }, use) => {
      await loginPage.goToOrangeHrm()
      await use()
    },
    logout: async ({ userPage }, use) => {
      await use()
      await userPage.logOut()
    }

  })

export { expect } from "@playwright/test"