import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import Authentication from './components/Authentication';
import Home from './components/Home';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute.js';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div>
        <Navigation />
        <Authentication />
        <ProtectedRoute path="/" component={Home} />
        <ProtectedRoute path="/profile" component={UserProfile} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default App;