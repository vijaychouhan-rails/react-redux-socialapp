import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App';
import Home from './containers/Home';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app')
);
