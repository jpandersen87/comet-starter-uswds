import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

const oktaAuth = new OktaAuth({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/login/callback',
});

const queryClient = new QueryClient();

export const App = () => {
  const navigate = useNavigate();

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    // This example is specific to React-Router
    navigate('/login');
  };

  const restoreOriginalUri = async (
    _oktaAuth: OktaAuth,
    originalUri: string,
  ) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <QueryClientProvider client={queryClient}>
        <Header />
        <main id="mainSection" className="usa-section">
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
    </Security>
  );
};
