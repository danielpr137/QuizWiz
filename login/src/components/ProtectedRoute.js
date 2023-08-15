import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function ProtectedRoute({ component: Component, ...rest }) {
  const { isSignedIn } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isSignedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
