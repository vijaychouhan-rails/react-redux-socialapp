import { combineReducers } from 'redux';
import PostReducer from './postReducer';
import {authStateReducer} from "redux-auth";
import { routerReducer } from 'react-router-redux'
import Immutable from "immutable"

const auth = (state = {}, action) => {
  return authStateReducer(Immutable.fromJS(state), action);
}

const rootReducer = combineReducers({
  routing: routerReducer,
  posts: PostReducer,
  auth: auth
});

export default rootReducer;
