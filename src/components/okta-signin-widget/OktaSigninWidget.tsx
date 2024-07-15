import type { Tokens } from '@okta/okta-auth-js';
import OktaSignIn, { type WidgetOptions } from '@okta/okta-signin-widget';
import { useEffect, useRef } from 'react';
import baseConfig from '../../config';

import '@okta/okta-signin-widget/css/okta-sign-in.min.css';

export interface OktaSignInWidgetProps {
  onSuccess: (tokens: Tokens) => void;
  onError: (err: Error) => void;
  config: WidgetOptions;
}

const OktaSignInWidget = ({
  onSuccess,
  onError,
  config,
}: OktaSignInWidgetProps) => {
  const widgetRef = useRef(null);
  useEffect(() => {
    if (!widgetRef.current) {
      return void 0;
    }

    const widget = new OktaSignIn({ ...config, ...baseConfig.widget });
    widget
      .showSignInToGetTokens({ el: widgetRef.current })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [onSuccess, onError, config]);

  return <div ref={widgetRef} />;
};

export default OktaSignInWidget;
