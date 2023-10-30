import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={true} sdkOptions={{
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "Stream pay",
        url: window.location.host,
      }
    }}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);