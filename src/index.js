import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import PostGrid from './containers/PostGrid';
import SignIn from './containers/SignIn';
import Followers from './components/Followers';
import Following from './components/Following';
import PostDetails from './components/PostDetails';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { EmailSignUpForm } from "redux-auth/bootstrap-theme";
import { EmailSignInForm } from "redux-auth/bootstrap-theme";

import { RequestPasswordResetForm } from "redux-auth/bootstrap-theme";
import { UpdatePasswordForm } from "redux-auth/bootstrap-theme";

import { configure } from "redux-auth";
import { fetch } from "redux-auth";

import {requireAuthentication} from './containers/AuthenticatedComponent';
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

// client-side usage
store.dispatch(configure(
  {apiUrl: "http://localhost:3000"},
  {serverSideRendering: true, cleanSession: true}
)).then(() => {
  // your store should now have the current user. now render your
  // app to the DOM. see the demo app for a more complete example.
});


// function requireAuth(store, nextState, replace, next) {
//   if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
//     replace('/login');
//   }
//   next();
// }


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAuthentication(Home)} />
        <Route path="posts" component={requireAuthentication(PostGrid)}/>
        <Route path="posts/:id" component={requireAuthentication(PostDetails)} />
        <Route path="following" component={requireAuthentication(Following)} />
        <Route path="followers" component={requireAuthentication(Followers)} />
        <Route path="login" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
