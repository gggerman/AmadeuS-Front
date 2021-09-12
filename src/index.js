import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from '@auth0/auth0-react'

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_AUDIENCE } = process.env;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain={REACT_APP_AUTH0_DOMAIN}
        clientId={REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={REACT_APP_AUTH0_AUDIENCE}
        scope="read:current_user update:current_user_metadata"
      >
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
