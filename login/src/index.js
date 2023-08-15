import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Authentication from './components/Authentication';
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <Authentication />
  </ClerkProvider>,
  document.getElementById('root')
);
