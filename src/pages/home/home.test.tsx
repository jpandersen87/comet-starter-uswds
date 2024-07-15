import { act, render } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth/use-auth';
import { User } from '../../types/user';
import { Home } from './home';

describe('Home', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Welcome Guest',
      );
    });
  });

  test('should render with mock data', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: { firstName: 'John', lastName: 'Doe' } as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual(
      'Welcome John Doe',
    );
  });
});
