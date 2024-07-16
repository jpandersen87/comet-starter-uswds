//import { launchData } from '../fixtures/data';
import { launchData } from '../fixtures/data';
import { expect, paths, test } from '../test';

test.describe('dashboard spec', () => {
  // Test Setup
  test.use({
    storageState: paths.oktaStorageState,
  });

  test('verifies access to dashboard after signing in', async ({
    page,
    baseURL,
    makeAxeBuilder,
    mockUserinfo,
  }) => {
    // Navigate to Homepage
    await page.goto(baseURL, { waitUntil: 'commit' });

    // eslint-disable-next-line prettier/prettier
    await mockUserinfo();

    // Setup Accessibility Testing
    const accessibilityScan = makeAxeBuilder();

    // Verify Homepage
    await expect(
      page.getByRole('heading', { name: 'Welcome John Doe' }),
    ).toBeVisible();

    // Mock launch data
    await page.route('/api/*', (route) => {
      route.fulfill({
        json: {
          results: launchData,
        },
      });
    });

    // Navigate to Dashboard
    page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(
      page.getByRole('heading', { name: 'Dashboard' }),
    ).toBeVisible();

    // Verify no accessibility violations
    let accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Mock launch data
    await page.route('/api/*', (route) => {
      route.fulfill({
        json: launchData[0],
      });
    });

    // Click on table item and verify details
    await page.getByRole('table').getByRole('link').first().click();
    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();

    // Verify no accessibility violations
    accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
