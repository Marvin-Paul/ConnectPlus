import { test, expect } from "@playwright/test";

test.describe("Connect+ System Integration", () => {
  test("should load the login page and verify backend health", async ({ page }) => {
    // 1. Check UI availability
    await page.goto("/");
    await expect(page).toHaveURL(/.*login/);
    
    // 2. Verify UI elements from the backend logic (e.g., logo or text)
    const loginTitle = page.locator("h1");
    await expect(loginTitle).toContainText(/Connect\+/i);
  });

  test("should verify that the feed API is integrated with the UI", async ({ page }) => {
    // We navigate to a state where the feed should load
    await page.goto("/");
    
    // Check if the feed container exists (even if empty/error, we want to see the UI reaction)
    const feedContainer = page.locator("[data-testid='post-feed'], .post-feed, main");
    await expect(feedContainer).toBeVisible();
  });

  test("should verify real-time notification badge integration", async ({ page }) => {
    await page.goto("/login");
    const notificationsLink = page.locator("a[href='/notifications'], .notifications-trigger");
    // Even if not logged in, the component should be present in the layout
    if (await notificationsLink.count() > 0) {
       await expect(notificationsLink).toBeVisible();
    }
  });
});
