import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react'
// import onRedirectCallback from './utils/history';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-jm5-i1j5.us.auth0.com"
        clientId="N8ZH9rNNPejtQ18v9Od5XxIYpDF0j55a"
        redirectUri={window.location.origin}
        // onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

