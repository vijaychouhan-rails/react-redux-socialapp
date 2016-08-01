export default function modal(state = [], action) {
  switch(action.type) {
    case "POST_LIST":
      //return [...state, {name: "test"}];
      return state;
    default:
      return state;
  }
}
