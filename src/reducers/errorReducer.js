export default function errorReducer(state = [], action) {
  switch(action.type) {
    case "SHOW_ERROR_MESSAGE":
      return state.concat(action.errors)
    case "RESET_ERROR_MESSAGE":
      console.log(state)
      return []
    default:
      return state;
  }
}
