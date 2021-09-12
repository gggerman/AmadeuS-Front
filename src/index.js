import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react'
// import { useHistory } from "react-router-dom";
// import onRedirectCallback from './utils/history'

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_AUDIENCE } = process.env;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain={REACT_APP_AUTH0_DOMAIN}
        clientId={REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        // onRedirectCallback={onRedirectCallback}
        audience={REACT_APP_AUTH0_AUDIENCE}
        scope="read:current_user update:current_user_metadata"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

