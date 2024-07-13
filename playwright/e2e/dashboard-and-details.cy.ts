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
    //page.getByRole("link", {name: "Sign in"}).click();
    //cy.signIn('test', '12345678');

    // Mock launch data
    /*cy.intercept('GET', '/api/*', {
      statusCode: 200,
      body: {
        results: launchData,
      },
    });

    // Navigate to Dashboard
    cy.get('#dashboard-link').click();
    cy.get('h1').should('contain', 'Dashboard');

    // Verify no accessibility violations
    cy.checkA11y();

    // Mock launch data
    cy.intercept('GET', '/api/*', {
      statusCode: 200,
      body: launchData[0],
    });

    // Click on table item and verify details
    cy.get('[id*="details-link-"]:first').click();
    cy.get('h1').should('contain', 'Details');*/

    // Verify no accessibility violations
    const accessibilityScanResults = await accessibilityScan.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
