import { devices, expect, test } from '../test';

test.describe('signin spec', () => {
  test.beforeEach(() => {
    // Test Setup
    test.use({ ...devices['macbook-16'] });
  });

  test('navigates to home and signs in', async ({
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

    // Navigate to Sign-in page
    //cy.get('#auth-link').click();

    // Verify no accessibility violations
    const accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Login
    //cy.signIn('test', '12345678');

    // Verify Homepage after signin
    expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    //cy.get('#sign-in-alert').should('not.exist');
  });
});
