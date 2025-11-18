import OtpUtils from "../Utils/otpUtils";
import { test as baseTest } from "./hooks-fixtures";

type otpUtilsType = {
  otpUtils : OtpUtils
}

export const test = baseTest.extend<otpUtilsType>(
  {
    otpUtils: async ({ }, use) => {
      await use(new OtpUtils)
    }

  })

export { expect } from "@playwright/test"

