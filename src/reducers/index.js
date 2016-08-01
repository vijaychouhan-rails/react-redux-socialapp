import { combineReducers } from 'redux';
import PostReducer from './postReducer';

const rootReducer = combineReducers({
  post: PostReducer
});

export default rootReducer;
