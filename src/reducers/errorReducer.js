export default function errorReducer(state = [], action) {
  switch(action.type) {
    case "SHOW_ERROR_MESSAGE":
      return state.concat(action.errors)
    case "RESET_ERROR_MESSAGE":
      console.log(state)
      return []
    case "EMAIL_SIGN_IN_ERROR":
      console.log("===ram==", state)
      console.log("===ram action==", action)
      return Object.assign({}, state, { errors: {}} )
      
    default:
      return state;
  }
}
