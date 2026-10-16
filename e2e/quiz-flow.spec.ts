import { test, expect } from "@playwright/test";

test.describe("Lovelle Full Platform End-to-End Flow", () => {
  test("1-4: Homepage -> Start Quiz -> Answer questions -> View Results", async ({ page }) => {
    // 1. Open homepage
    await page.goto("/");
    await expect(page).toHaveTitle(/Lovelle/i);
    await expect(page.locator("h1")).toContainText(/Fun Quizzes & Games/i);

    // 2. Start a quiz
    await page.goto("/quizzes/couple-compatibility");
    await expect(page.locator("h1")).toContainText(/Couple Compatibility Test/i);
    await page.getByRole("button", { name: /Start Quiz/i }).click();

    // 3. Answer questions until completion
    for (let i = 0; i < 8; i++) {
      // Pick first available choice on each question
      const firstOption = page.locator("fieldset button").first();
      await firstOption.click();

      const nextButton = page.getByRole("button", { name: /(Next|See Results)/i });
      await nextButton.click();
    }

    // 4. View results
    await expect(page.locator('[aria-label="Quiz results"]')).toBeVisible();
    await expect(page.getByText(/Share Result/i)).toBeVisible();
  });

  test("5-9: Create custom quiz -> Copy Share Link -> Open as participant -> Submit & verify score", async ({
    page,
    browser,
  }) => {
    // 5. Create a custom quiz
    await page.goto("/create");
    await expect(page.locator("h1")).toContainText(/Create Your Relationship Quiz/i);

    await page.fill('input[placeholder*="e.g. How Well Does Alex Know Me"]', "Alex & Jordan E2E Test");
    await page.fill('input[placeholder*="e.g. Alex"]', "Alex");

    // 6. Publish quiz
    await page.getByRole("button", { name: /Publish & Get Share Link/i }).click();

    // Expect success screen with share link
    await expect(page.getByText(/Your Quiz is Live!/i)).toBeVisible();
    const playButton = page.getByRole("link", { name: /Play Your Quiz/i });
    const href = await playButton.getAttribute("href");
    expect(href).toMatch(/\/play\/.+/);

    // 7. Open link as a separate participant (new browser context)
    const participantContext = await browser.newContext();
    const participantPage = await participantContext.newPage();
    await participantPage.goto(href!);

    await expect(participantPage.getByText(/Alex & Jordan E2E Test/i)).toBeVisible();

    // 8. Enter participant name & answer
    await participantPage.fill('input[placeholder*="e.g. Jordan"]', "Jordan");
    await participantPage.getByRole("button", { name: /Start Quiz/i }).click();

    // Answer questions
    const firstOption = participantPage.locator("button:has-text('Cheesy Pizza')");
    if (await firstOption.isVisible()) {
      await firstOption.click();
    } else {
      await participantPage.locator("button").first().click();
    }
    await participantPage.getByRole("button", { name: /Next Question/i }).click();

    // Answer second question
    await participantPage.locator("button").first().click();
    await participantPage.getByRole("button", { name: /Complete Quiz/i }).click();

    // 9. Verify result visibility
    await expect(participantPage.getByText(/Jordan, Your Result!/i)).toBeVisible();
    await expect(participantPage.getByText(/correct/i)).toBeVisible();

    await participantContext.close();
  });

  test("10: Unauthorized users cannot access protected admin data", async ({ page, request }) => {
    // Direct API call without authorization must return 401
    const res = await request.get("/api/admin/analytics");
    expect(res.status()).toBe(401);

    // UI screen prompts for secret key and does not leak telemetry
    await page.goto("/admin/analytics");
    await expect(page.locator("h1")).toContainText(/Protected Admin Dashboard/i);
    await expect(page.locator("input[type='password']")).toBeVisible();
  });
});
