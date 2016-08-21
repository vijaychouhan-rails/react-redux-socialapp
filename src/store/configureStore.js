import rootReducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

//Thunk middleware for Redux
import reduxThunk from 'redux-thunk';

export default function configureStore(initialState) {
  const logger = createLogger();

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(reduxThunk, logger),
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