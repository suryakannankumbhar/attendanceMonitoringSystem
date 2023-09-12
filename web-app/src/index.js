import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain='dev-pp7z7v5zvwl7ttoq.us.auth0.com'
        clientId='LEv9u0hmAQ7kldEOuyzSWNgmb6Bzn9hk'
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <App />
    </Auth0Provider>
);
