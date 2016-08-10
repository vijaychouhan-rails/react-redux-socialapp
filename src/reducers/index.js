import { combineReducers } from 'redux';
import PostReducer from './postReducer';
import {authStateReducer} from "redux-auth";
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  posts: PostReducer
});

export default rootReducer;
