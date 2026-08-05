import { Locator, Page, expect } from "@playwright/test";
import { log } from "../helpers/logger";

export default class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  // all reusable actions
  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async clickTo(ele: Locator) {
    try {
      await expect(ele).toBeVisible({ timeout: 10_000 });
      await ele.click();
    } catch (error) {
      await log(
        "error",
        `Failed to click element: ${ele.toString()},original error: ${error}`,
      );
      throw error;
    }
  }
}
