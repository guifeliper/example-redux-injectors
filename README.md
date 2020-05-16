# <img src="https://raw.githubusercontent.com/react-boilerplate/redux-injectors/3d1e0d2be038bc710c5f319ca680dd6a1e88d5e8/img/logo.svg?sanitize=true" alt="alt text" width="400"></img>

Dynamically load [redux](https://redux.js.org/) reducers and [redux-saga](https://redux-saga.js.org/) sagas as needed, instead of loading them all upfront. This has some nice benefits, such as avoiding having to manage a big global list of reducers and sagas. It also allows more effective use of [code-splitting](https://webpack.js.org/guides/code-splitting/). See [motivation](#Motivation). As used by [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).

## Motivation
My motivation to create this repository was to facilitate those that are trying to implement the redux-injectors library, but do not find a full example version. I have faced some issues to implement the library and a full example version would help me on that moment. 


## Getting Started

To start the project:
```bash
yarn start
```

To understand the implementation go to the file configureStore.js or with the following code: 

```bash
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



```
