import React from 'react';
import { SignIn, UserButton, useUser } from '@clerk/clerk-react';

function Authentication() {
  const { isSignedIn, user } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <>
          <h1>Welcome, {user.firstName}!</h1>
          <UserButton />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Authentication;
