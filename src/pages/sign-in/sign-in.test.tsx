import * as oktaReact from '@okta/okta-react';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import { SignIn } from './sign-in';

describe('SignIn', () => {
  const signInComponent = (
    <RecoilRoot>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </RecoilRoot>
  );
  vi.spyOn(oktaReact, 'useOktaAuth').mockReturnValue({
    oktaAuth: {} as never,
    authState: null,
  });

  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('should render successfully', async () => {
    const { baseElement } = render(signInComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
