import { devices, expect, test } from '../test';

test.describe('home spec', () => {
  test.beforeEach(() => {
    // Test Setup
    test.use({ ...devices['macbook-16'] });
  });

  test('navigates to home', async ({ page, baseURL, makeAxeBuilder }) => {
    // Navigate to Homepage
    page.goto(baseURL);

    // Setup Accessibility Testing
    const accessibilityScan = makeAxeBuilder();

    // Verify Homepage
    expect(page.getByRole('heading', { name: 'Welcome Guest' })).toBeVisible();
    //cy.get('#sign-in-alert').should('exist');

    // Verify no accessibility violations
    const accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
