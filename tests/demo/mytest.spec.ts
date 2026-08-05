import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";

test("Should load homepage with correct title", async ({ page }, testInfo) => {
  const envConfig = testInfo.project.use as any;
  console.log("error", "testing login");
  await page.goto(envConfig.appUrl);
  await expect(page).toHaveTitle("YouTube");
});
