import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import appReducer from '../reducers/appReducer'
import authReducer from '../reducers/authReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    // auth: authReducer,
    app: appReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app']
}

const composeEnhancers = (typeof window !==  'undefined'  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore( persistReducer(persistConfig, rootReducer), composeEnhancers( applyMiddleware( thunk) ) );

export const persistor = persistStore(store)

export default { store, persistor };