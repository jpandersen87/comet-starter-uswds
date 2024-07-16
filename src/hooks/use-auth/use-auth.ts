import { useOktaAuth } from '@okta/okta-react';
import { getSignInRedirectUrl } from '@src/utils/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentUser, signedIn } from '../../store';
import { User, type OktaUserClaims } from '../../types/user';

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
    if (authState?.isAuthenticated) {
      setIsSignedIn(true);
    }
  }, [authState?.isAuthenticated, setIsSignedIn]);

  useEffect(() => {
    setIsLoading(!authState);
  }, [authState, setIsLoading]);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setCurrentUserData(undefined);
    } else {
      oktaAuth
        .getUser()
        .then((info: OktaUserClaims) => {
          setCurrentUserData({
            displayName: info.name,
            emailAddress: info.email,
            firstName: info.given_name,
            lastName: info.family_name,
            phoneNumber: info.phone_number,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [authState, oktaAuth, setCurrentUserData]);

  useEffect(() => {
    if (authState?.error) {
      setError(authState?.error.message);
      setIsSignedIn(false);
    }
  }, [authState?.error, setIsSignedIn]);

  const signIn = (): void => {
    oktaAuth.signInWithRedirect({ redirectUri: getSignInRedirectUrl() });
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserData({} as User);
    if (authState?.isAuthenticated) {
      oktaAuth.signOut({ postLogoutRedirectUri: getSignInRedirectUrl() });
    } else {
      setIsSignedIn(false);
      setCurrentUserData({} as User);
    }
  };

  return { isSignedIn, isLoading, currentUserData, error, signIn, signOut };
};

export default useAuth;
