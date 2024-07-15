import { toRelativeUrl } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../loading/Loading';

export const RequiredAuth: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin,
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, authState?.isAuthenticated, authState]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};
