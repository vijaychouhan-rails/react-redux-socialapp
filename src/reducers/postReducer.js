var update = require('react/lib/update')

export default function postReducer(state = [], action) {
  switch(action.type) {
    case "POST_LIST":
      console.log("load post list")
      console.log(action)
      //this will add new posts into existing state and return new array
      //Internal its equal to concat function of javascript
      //return [...state, ...action.posts];
      return action.posts
    case "PUBLIC_POST":
      console.log(action)
      return action.posts
    case 'ADD_COMMENT':
      var new_state = Object.assign([], state)

      return new_state.map((post, index) => {
        if (post.id === action.comment.post_id) {
          post.comments.push(action.comment)
        }
        return post
      })

    case 'ADD_POST':
      var new_state = Object.assign([], state)
      new_state.push(action.post)
      return new_state

    case 'LIKE_UNLIKE_POST':
      var new_state = Object.assign([], state)
      return new_state.map((post, index) => {
        if (post.id === action.post.id) {
          return action.post
        }
        return post
      })

    case 'USER_LOGOUT':
      console.log("===========USER_LOGOUT======================")
      return []
    default:
      return state;
  }
}
