import AxeBuilder from '@axe-core/playwright';
import { devices as baseDevices, test as baseTest } from '@playwright/test';

type TestFixtures = {
  makeAxeBuilder: () => AxeBuilder;
};

export * from '@playwright/test';

export const test = baseTest.extend<TestFixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#commonly-reused-element-with-known-issue');

    await use(makeAxeBuilder);
  },
});
export const devices = {
  ...baseDevices,
  'macbook-16': {
    ...baseDevices['Desktop Safari'],
    viewport: {
      width: 1536,
      height: 960,
    },
  } satisfies (typeof baseDevices)['Desktop Safari'],
};
