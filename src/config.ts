const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const ISSUER =
  process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK =
  process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const BASENAME = process.env.PUBLIC_URL || '';
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;
const USE_INTERACTION_CODE = process.env.USE_INTERACTION_CODE === 'true';

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  widget: {
    baseUrl: ISSUER.replace('/oauth2/default', ''),
    clientId: CLIENT_ID,
    redirectUri: `${window.location.origin}/login/callback`,
    useInteractionCodeFlow: USE_INTERACTION_CODE,
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
  },
};
