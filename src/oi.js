import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Task, Meeting, Snackbar, MeetingsDialog } from './reducers';
import rootSaga from './sagas';

const staticReducers = {
  snackbar: Snackbar,
  task: Task,
  meeting: Meeting,
  meetingDialog: MeetingsDialog,
}

export default () => {
  let composeEnhancers = compose;
  const sagaMiddleware = createSagaMiddleware();

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const store = createStore(
    createReducer(),
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    ));

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  };

  sagaMiddleware.run(rootSaga);
  return store;
};

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}
