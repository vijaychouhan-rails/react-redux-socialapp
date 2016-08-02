import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import PostGrid from './containers/PostGrid';
import Followers from './components/Followers';
import Following from './components/Following';
import PostDetails from './components/PostDetails';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { EmailSignUpForm } from "redux-auth/bootstrap-theme";
import { EmailSignInForm } from "redux-auth/bootstrap-theme";
import { SignOutButton } from "redux-auth/bootstrap-theme";
import { RequestPasswordResetForm } from "redux-auth/bootstrap-theme";
import { UpdatePasswordForm } from "redux-auth/bootstrap-theme";

import { configure } from "redux-auth";
import { fetch } from "redux-auth";


const store = configureStore();

// client-side usage
store.dispatch(configure(
  {apiUrl: "http://localhost:3000"},
  {serverSideRendering: true, cleanSession: true}
)).then(() => {
  // your store should now have the current user. now render your
  // app to the DOM. see the demo app for a more complete example.
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="posts" component={PostGrid} />
        <Route path="posts/:id" component={PostDetails} />
        <Route path="following" component={Following} />
        <Route path="followers" component={Followers} />
        <Route path="login" component={EmailSignInForm} />

      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
