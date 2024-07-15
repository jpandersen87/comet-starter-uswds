import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useAuth from './use-auth'; // Import your useAuth function

interface ContextWrapperProps {
  children: React.ReactNode;
}

vi.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    oktaAuth: {} as never,
    authState: {} as never,
  }),
}));

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
    vi.mock('@okta/okta-react', () => ({
      useOktaAuth: () => ({
        oktaAuth: {
          signInWithRedirect: vi.fn(),
          signOut: vi.fn(),
        } as never,
        authState: {
          isAuthenticated: true,
          idToken: {
            claims: {
              given_name: 'John',
              family_name: 'Doe',
              preferred_username: 'John Doe',
              email: 'jdoe@test.com',
              //phoneNumber: '1234567890',
            },
          },
        },
      }),
    }));

    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn();
    });

    expect(result.current.isSignedIn).toBe(true);
  });
});
