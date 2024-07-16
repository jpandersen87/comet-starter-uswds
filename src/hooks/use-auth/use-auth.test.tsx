import { useOktaAuth } from '@okta/okta-react';
import { act, renderHook } from '@testing-library/react';
import { useMemo, useState } from 'react';
import { RecoilRoot } from 'recoil';
import useAuth from './use-auth'; // Import your useAuth function

interface ContextWrapperProps {
  children: React.ReactNode;
}

vi.mock('@okta/okta-react', () => ({
  useOktaAuth: vi.fn(),
}));

const mockUseOktaAuth = vi.mocked(useOktaAuth);

mockUseOktaAuth.mockImplementation(() => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const state = useMemo(
    () =>
      ({
        oktaAuth: {
          signInWithRedirect: () => {
            setIsSignedIn(true);
          },
          getUser: vi.fn().mockResolvedValue({
            given_name: 'John',
            family_name: 'Doe',
            name: 'John Doe',
            preferred_username: 'jdoe@test.com',
            email: 'jdoe@test.com',
            phone_number: '1234567890',
          }),
        },
        authState: !isSignedIn
          ? {}
          : {
              isAuthenticated: true,
              idToken: {
                claims: {
                  name: 'John Doe',
                  preferred_username: 'jdoe@test.com',
                  email: 'jdoe@test.com',
                },
              },
            },
      }) as never,
    [isSignedIn],
  );
  return state;
});

describe('useAuth', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <RecoilRoot>{children}</RecoilRoot>
  );

  it('should set isSignedIn to true when authenticated', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn();
    });

    expect(result.current.isSignedIn).toBe(true);
  });

  it('should sign out and set isSignedIn to false when authenticated', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.isSignedIn).toBe(false);
  });

  it('should set isSignedIn to true when authenticated and with profile', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn();
    });

    expect(result.current.isSignedIn).toBe(true);
  });
});
