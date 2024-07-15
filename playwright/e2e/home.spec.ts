import { expect, test } from '../test';

test.describe('home spec', () => {
  test('navigates to home', async ({ page, baseURL, makeAxeBuilder }) => {
    // Navigate to Homepage
    await page.goto(baseURL);

    // Setup Accessibility Testing
    const accessibilityScan = makeAxeBuilder();

    // Verify Homepage
    await expect(
      page.getByRole('heading', { name: 'Welcome Guest' }),
    ).toBeVisible();
    await expect(
      page.getByText('You are not currently signed in'),
    ).toBeVisible();

    // Verify no accessibility violations
    const accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
