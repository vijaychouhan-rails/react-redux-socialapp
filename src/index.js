import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import PostGrid from './containers/PostGrid';
import SignIn from './containers/SignIn';
import Followers from './components/Followers';
import Following from './components/Following';
import PostDetails from './containers/PostDetails';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import { EmailSignUpForm } from "redux-auth/bootstrap-theme";
// import { EmailSignInForm } from "redux-auth/bootstrap-theme";

// import { RequestPasswordResetForm } from "redux-auth/bootstrap-theme";
// import { UpdatePasswordForm } from "redux-auth/bootstrap-theme";

import { configure } from "redux-auth";
import { fetch } from "redux-auth";

import routes from './routes'

//import {requireAuthentication} from './containers/AuthenticatedComponent';
import { syncHistoryWithStore } from 'react-router-redux'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__
console.log("============initialState=========")
console.log(initialState)
console.log("============End initialState=========")
const store = configureStore(initialState);

// const history = syncHistoryWithStore(browserHistory, store)

// client-side usage
// store.dispatch(configure(
//   {apiUrl: "http://localhost:3000"},
//   {serverSideRendering: true, cleanSession: true}
// )).then(() => {
//   // your store should now have the current user. now render your
//   // app to the DOM. see the demo app for a more complete example.
// });


// function requireAuth(store, nextState, replace, next) {
//   if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
//     replace('/login');
//   }
//   next();
// }

//const store = createStore(PostReducer, initialState, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('app')
);
