import { combineReducers } from 'redux';
import PostReducer from './postReducer';
import ErrorReducer from './errorReducer';
import PageLoaderReducer from './pageLoader';
import FeedReducer from './feedReducer';
import {authStateReducer} from "redux-auth";
import { routerReducer } from 'react-router-redux'
import Immutable from "immutable"
import {reducer as formReducer} from 'redux-form';

const auth = (state = {}, action) => {
  return authStateReducer(Immutable.fromJS(state), action);
}

const rootReducer = combineReducers({
  routing: routerReducer,
  feeds: FeedReducer,
  posts: PostReducer,
  auth: auth,
  form: formReducer,
  errors: ErrorReducer,
  pageLoader: PageLoaderReducer
});

export default rootReducer;
