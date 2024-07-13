import { useOktaAuth } from '@okta/okta-react';
import { getSignInRedirectUrl } from '@src/utils/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../data/user';
import { currentUser, signedIn } from '../store';
import { User } from '../types/user';

const useAuth = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserData] = useRecoilState<
    User | undefined
  >(currentUser);

  /* TODO: Uncomment for interacting with own API, no need to send tokens to external public API */
  // useEffect(() => {
  //   if (auth.user) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.user.access_token;
  //   } else {
  //     axios.defaults.headers.common['Authorization'] = undefined;
  //   }
  // }, [auth.user]);

  useEffect(() => {
    if (authState?.idToken) {
      setIsSignedIn(true);
    }
  }, [authState?.idToken, setIsSignedIn]);

  useEffect(() => {
    setIsLoading(!authState);
  }, [authState, setIsLoading]);

  useEffect(() => {
    const profile = authState?.idToken?.claims;
    if (profile && !currentUserData) {
      setCurrentUserData({
        firstName: profile.given_name,
        lastName: profile.family_name,
        displayName: profile.name,
        emailAddress: profile.email,
        //phoneNumber: profile.phone_number,
      });
    }
  }, [authState?.idToken?.claims, currentUserData, setCurrentUserData]);

  useEffect(() => {
    if (authState?.error) {
      setError(authState?.error.message);
      setIsSignedIn(false);
    }
  }, [authState?.error, setIsSignedIn]);

  const signIn = (isSso: boolean): void => {
    if (isSso) {
      oktaAuth.signInWithRedirect({ redirectUri: getSignInRedirectUrl() });
    } else {
      setIsSignedIn(true);
      setCurrentUserData(userData);
    }
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserData({} as User);
    if (authState?.idToken) {
      oktaAuth.signOut({ postLogoutRedirectUri: getSignInRedirectUrl() });
    } else {
      setIsSignedIn(false);
      setCurrentUserData({} as User);
    }
  };

  return { isSignedIn, isLoading, currentUserData, error, signIn, signOut };
};

export default useAuth;
