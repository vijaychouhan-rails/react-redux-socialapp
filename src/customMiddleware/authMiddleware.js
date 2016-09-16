import Immutable from "immutable"
import { signOut } from "redux-auth";

const authMiddleware = store => next => action => {
  if(action.type == "EMAIL_SIGN_UP_COMPLETE"){
    store.dispatch(signOut()).then(console.log("========SIGNOUT THEN BLOCK============")).catch(() => store.dispatch({type: 'HIDE_SIGN_OUT_ERROR_MODAL'}) );
    return next(action)
  }
  //if(action.type !== 'custom') return next(action)
  //do stuff!
  return next(action)
}

//Example::
// const extendUserProfile = store => next => action => {
//   const state = store.getState();
//   const attributes = state.auth.getIn(['user', 'attributes']);
//   if (action.type === SET_USER_PROFILE && attributes) {
//     action.payload.attributes = attributes;
//     return next(action);
//   }

//   return next(action);
// };

export default authMiddleware;
