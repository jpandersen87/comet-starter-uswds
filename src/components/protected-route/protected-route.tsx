import { useOktaAuth } from '@okta/okta-react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (): React.ReactElement => {
  const { authState } = useOktaAuth();
  if (!authState)
    return (
      <div className="grid-container">
        <div>Loading...</div>
      </div>
    );

  return authState.idToken ? <Outlet /> : <Navigate to="/signin" />;
};
