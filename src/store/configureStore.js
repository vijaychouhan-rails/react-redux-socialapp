import rootReducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

//Thunk middleware for Redux
import reduxThunk from 'redux-thunk';

import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

export default function configureStore(initialState) {
  const logger = createLogger();
  
  const middleware = routerMiddleware(browserHistory)

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(reduxThunk, logger, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}