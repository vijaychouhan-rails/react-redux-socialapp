export default function modal(state = {}, action) {
  switch(action.type) {
    case "POST_LIST":
      console.log(action)
      return state;
    default:
      return state;
  }
}
