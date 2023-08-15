import React from 'react';
import { useUser } from '@clerk/clerk-react';

function UserProfile() {
  const { user } = useUser();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      {/* Add additional user profile information and functionality here */}
    </div>
  );
}

export default UserProfile;
