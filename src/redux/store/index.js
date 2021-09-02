import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers/appReducer'
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
    // auth: authReducer,
    app: appReducer
})

const composeEnhancers = (typeof window !==  'undefined'  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk) ) );