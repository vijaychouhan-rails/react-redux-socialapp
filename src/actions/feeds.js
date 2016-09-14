import { fetch } from 'redux-auth';

export function fetchFeeds() {
  return function(dispatch){
    const url = API_URL + "/public/feeds";
    fetch(url, {credentials: 'include'})
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        dispatch({
          type: 'FEED_LIST',
          feeds: data.feeds
        })
      })
      .catch(function(error){
        console.log("Opps...", "Could not fetch in fetchfeed " + error);
      })
  }
}

export function likeUnlikeFeed(feed_id) {
  return function(dispatch) {
    dispatch({ type: 'PAGE_LOADER' })
    const url = API_URL + ('/posts/' + feed_id + '/post_like_unlike')
    
    fetch(url, {credentials: 'include', method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(function(response){
        dispatch({ type: 'STOP_PAGE_LOADER' })
        return(response.json());
      })
      .then(function(data){
        console.log("=======likeUnlikePost============================", data)
        dispatch({
          type: 'LIKE_UNLIKE_FEED',
          feed: data
        }) 

      })
      .catch(function(error){
        console.log("Opps...", "Could not likeUnlikeFeed " + error);
      })
  }
}
