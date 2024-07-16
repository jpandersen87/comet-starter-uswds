import type { OktaAuthOptions } from '@okta/okta-auth-js';
import type { WidgetOptions } from '@okta/okta-signin-widget';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '{clientId}';
const ISSUER =
  import.meta.env.VITE_ISSUER || 'https://{youroktadomain}.com/oauth2/default';
const BASENAME = import.meta.env.VITE_PUBLIC_URL || '';
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email', 'phone'],
    pkce: true,
  } satisfies OktaAuthOptions,
  widget: {
    baseUrl: ISSUER.replace('/oauth2/default', ''),
    clientId: CLIENT_ID,
    redirectUri: `${window.location.origin}/login/callback`,
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
  } satisfies WidgetOptions,
};
