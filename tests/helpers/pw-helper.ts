import { test, type Page, type Locator } from "@playwright/test";
/**
 *
 * @param page
 * @param screenShotName
 */
async function fullScreenShotPage(page: Page, screenShotName: string) {
  const ss = await page.screenshot({ fullPage: true });
  //attach screen shot to report
  await test.info().attach(screenShotName, {
    body: ss,
    contentType: "image/png",
  });
}

async function takeElementScreenShot(element: Locator, screenShotName: string) {
  const ss = await element.screenshot();
  //attach screen shot to report
  await test.info().attach(screenShotName, {
    body: ss,
    contentType: "image/png",
  });
}
