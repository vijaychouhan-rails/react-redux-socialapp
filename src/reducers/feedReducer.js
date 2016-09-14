export default function feedReducer(state = [], action) {
  switch(action.type) {
    case "FEED_LIST":
      console.log("load feed list")
      console.log(action)
      return action.feeds

    case 'LIKE_UNLIKE_FEED':
      var new_state = Object.assign([], state)
      return new_state.map((feed, index) => {
        if (feed.id === action.feed.id) {
          return action.feed
        }
        return feed
      })
    case 'ADD_FEED_COMMENT':
      var new_state = Object.assign([], state)

      return new_state.map((feed, index) => {
        if (feed.id === action.comment.post_id) {
          feed.comments.push(action.comment)
        }
        return feed
      })

    default:
      return state;
  }
}
