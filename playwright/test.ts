import AxeBuilder from '@axe-core/playwright';
import { test as baseTest } from '@playwright/test';
import { join } from 'node:path';

type TestFixtures = {
  makeAxeBuilder: () => AxeBuilder;
  mockSigninDisplay: () => Promise<void>;
  mockUserinfo: () => Promise<void>;
  paths: typeof paths;
  baseURL: string;
};

export * from '@playwright/test';

export const paths = {
  oktaIntrospect: join(import.meta.dirname, './fixtures/okta-introspect.json'),
  oktaOpenidConfiguration: join(
    import.meta.dirname,
    './fixtures/okta-openid-configuration.json',
  ),
  oktaStorageState: join(
    import.meta.dirname,
    './fixtures/okta-storageState.json',
  ),
  oktaInteract: join(import.meta.dirname, './fixtures/okta-interact.json'),
  oktaUserinfo: join(import.meta.dirname, './fixtures/okta-userinfo.json'),
};

export const test = baseTest.extend<TestFixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#commonly-reused-element-with-known-issue');

    await use(makeAxeBuilder);
  },
  mockSigninDisplay: async (
    { page, paths: { oktaIntrospect, oktaOpenidConfiguration, oktaInteract } },
    use,
  ) => {
    const fn = async () => {
      await page.route(
        /https?:\/\/.+\/oauth2\/default\/\.well-known\/openid-configuration/,
        (route) => {
          route.fulfill({
            path: oktaOpenidConfiguration,
          });
        },
      );

      await page.route(
        /https?:\/\/.+\/oauth2\/default\/v1\/interact/,
        (route) => {
          route.fulfill({
            path: oktaInteract,
          });
        },
      );

      await page.route(/https?:\/\/.+\/idp\/idx\/introspect/, (route) => {
        route.fulfill({
          path: oktaIntrospect,
        });
      });
    };

    await use(fn);
  },
  mockUserinfo: async ({ page, paths }, use) => {
    const fn = async () => {
      await page.route(
        /https?:\/\/.+\/oauth2\/default\/v1\/userinfo/,
        (route) => {
          route.fulfill({
            path: paths.oktaUserinfo,
          });
        },
      );
    };

    await use(fn);
  },
  paths,
});
