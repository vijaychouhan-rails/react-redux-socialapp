export default function postReducer(state = [], action) {
  switch(action.type) {
    case "POST_LIST":
      console.log("load post list")
      console.log(action)
      //this will add new posts into existing state and return new array
      //Internal its equal to concat function of javascript
      //return [...state, ...action.posts];
      return action.posts
    default:
      return state;
  }
}
