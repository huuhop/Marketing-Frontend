import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import reducer from '~/redux/reducers/index';

import createSagaMiddleware from 'redux-saga';
import saga from '~/redux/sagas/index';
import history from './history.js';

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer(history),
    composeSetup(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);
sagaMiddleware.run(saga);

export default store;