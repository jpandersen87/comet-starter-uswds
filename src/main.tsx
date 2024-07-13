import OktaAuth from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { routes } from './router.tsx';
import './styles.scss';

const router = createBrowserRouter(routes);
const oktaAuth = new OktaAuth({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/login/callback',
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const restoreOriginalUri = async (_oktaAuth: unknown, originalUri: unknown) => {
  /*history.replace(
    toRelativeUrl(originalUri || '/', window.location.origin),
  );*/
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </Security>
  </React.StrictMode>,
);
