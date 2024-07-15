//import { launchData } from '../fixtures/data';
import { devices, expect, test } from '../test';

test.describe('dashboard spec', () => {
  test.beforeEach(() => {
    // Test Setup
    test.use({ ...devices['macbook-16'] });
  });

  test('verifies access to dashboard after signing in', async ({
    page,
    baseURL,
    makeAxeBuilder,
  }) => {
    // Navigate to Homepage
    page.goto(baseURL);

    // Setup Accessibility Testing
    const accessibilityScan = makeAxeBuilder();

    // Verify Homepage
    expect(page.getByRole('heading', { name: 'Welcome Guest' })).toBeVisible();

    // Sign In
    page.getByRole('link', { name: 'Sign In' }).click();
    //cy.signIn('test', '12345678');

    // Mock launch data
    /*cy.intercept('GET', '/api/*', {
      statusCode: 200,
      body: {
        results: launchData,
      },
    });*/

    // Navigate to Dashboard
    page.getByRole('link', { name: 'Dashboard' }).click();
    expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Verify no accessibility violations
    let accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Mock launch data
    /*cy.intercept('GET', '/api/*', {
      statusCode: 200,
      body: launchData[0],
    });*/

    // Click on table item and verify details
    page.getByRole('table').getByRole('link').first().click();
    expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();

    // Verify no accessibility violations
    accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
