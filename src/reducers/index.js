import { combineReducers } from 'redux';
import PostReducer from './postReducer';
import {authStateReducer} from "redux-auth";

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: authStateReducer
});

export default rootReducer;
