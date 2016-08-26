import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './containers/Home';
import PostGrid from './containers/PostGrid';
import SignIn from './containers/SignIn';
import Followers from './components/Followers';
import Following from './components/Following';
import PostDetails from './containers/PostDetails';
import NewPost from './containers/NewPost';
import {requireAuthentication} from './containers/AuthenticatedComponent';

  const routes = (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={(Home)} />
          <Route path="posts" component={requireAuthentication(PostGrid)}/>
          <Route path="posts/new" component={requireAuthentication(NewPost)}/>
          <Route path="posts/:id" component={requireAuthentication(PostDetails)} />
          <Route path="following" component={(Following)} />
          <Route path="followers" component={(Followers)} />
          <Route path="login" component={SignIn} />
        </Route>
      </Router>
  )

export default routes