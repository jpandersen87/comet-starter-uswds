import { expect, paths, test } from '../test';

test.describe('signin spec', () => {
  test.describe('before signin', () => {
    test('navigates to home and signs in', async ({
      page,
      baseURL,
      makeAxeBuilder,
      mockSigninDisplay,
    }) => {
      // Navigate to Homepage
      await page.goto(baseURL);

      // Setup Accessibility Testing
      const accessibilityScan = makeAxeBuilder();

      // Verify Homepage
      expect(
        page.getByRole('heading', { name: 'Welcome Guest' }),
      ).toBeVisible();

      // Navigate to Sign-in page
      page.getByRole('link', { name: 'Sign In' }).click();

      await mockSigninDisplay();

      await expect(page.getByLabel('Username')).toBeVisible();

      // Verify no accessibility violations
      const accessibilityScanResults = await accessibilityScan.analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('after signin', () => {
    test.use({
      storageState: paths.oktaStorageState,
    });

    test('navigates to home', async ({ page, baseURL, makeAxeBuilder }) => {
      // Login
      await page.goto(baseURL);

      // Setup Accessibility Testing
      const accessibilityScan = makeAxeBuilder();

      // Verify Homepage after signin
      expect(
        page.getByRole('heading', { name: 'Welcome John Doe' }),
      ).toBeVisible();
      expect(
        page.getByText('You are not currently signed in'),
      ).not.toBeVisible();

      // Verify no accessibility violations
      const accessibilityScanResults = await accessibilityScan.analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
