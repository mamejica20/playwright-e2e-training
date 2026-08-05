import { test, expect } from "@playwright/test";

test("YouTube search and play Section Y - NPS Music", async ({ page }) => {
  await page.goto("https://www.youtube.com/");

  const consentButton = page
    .locator(
      'button:has-text("Accept all"), button:has-text("Reject all"), button:has-text("Přijmout vše"), button:has-text("Odmítnout vše")',
    )
    .first();
  if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButton.click();
  }

  const searchInput = page.locator("input[name='search_query']");
  await expect(searchInput).toBeVisible({ timeout: 15000 });
  await searchInput.fill("Section Y - NPS Music");
  await searchInput.press("Enter");
  await page.waitForURL(/.*results.*/, { timeout: 20000 });

  const firstResult = page.locator("ytd-video-renderer a#thumbnail").first();
  await expect(firstResult).toBeVisible({ timeout: 20000 });
  await firstResult.click();

  const video = page.locator("#movie_player video");
  await expect(video).toBeVisible({ timeout: 30000 });

  await page.waitForFunction(
    () => {
      const element = document.querySelector<HTMLVideoElement>(
        "#movie_player video",
      );
      return !!element && element.readyState >= 3;
    },
    { timeout: 30000 },
  );

  await page.waitForFunction(
    () => {
      const element = document.querySelector<HTMLVideoElement>(
        "#movie_player video",
      );
      return !!element && !element.paused && element.currentTime > 1;
    },
    { timeout: 60000 },
  );

  expect(
    await video.evaluate((node) => !node.paused && node.currentTime > 0.5),
  ).toBeTruthy();
});
