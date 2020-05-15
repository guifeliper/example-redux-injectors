import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from "redux-injectors"

import defaultReducer from './defaultReducer';

const staticReducers = {
  default: defaultReducer,
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}

export default () => {
  let composeEnhancers = compose;
  const sagaMiddleware = createSagaMiddleware();
  const runSaga = sagaMiddleware.run;
  
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }
  
  const injectEnhancer = createInjectorsEnhancer({
    createReducer,
    runSaga,
  })
  
  const store = createStore(
    createReducer(),
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
      injectEnhancer
    )
  );
      
  store.asyncReducers = {};

  return store;
};


