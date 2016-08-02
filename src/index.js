import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import Posts from './containers/Posts';
import Followers from './components/Followers';
import Following from './components/Following';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="posts" component={Posts} />
        <Route path="following" component={Following} />
        <Route path="followers" component={Followers} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
