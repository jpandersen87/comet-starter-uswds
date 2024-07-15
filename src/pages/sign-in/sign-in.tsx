import type { Tokens } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from '@src/components/okta-signin-widget/OktaSigninWidget';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

export const SignIn = (): React.ReactElement => {
  const config = useParams();
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens: Tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err: Error) => {
    console.log('error logging in', err);
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? (
    <Navigate to={{ pathname: '/' }} />
  ) : (
    <div className="grid-container">
      <div className="grid-row">
        <div className="tablet:grid-col-6">
          <OktaSignInWidget
            config={config}
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
      </div>
    </div>
  );
};
