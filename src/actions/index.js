export function fetchPosts() {
  return function(dispatch){
    const url = "http://localhost:3000/posts";
    fetch(url)
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        console.log(data)
        dispatch({
          type: 'POST_LIST',
          posts: data.posts
        })
      })
      .catch(function(error){
        console.log("Opps...", "Could not fetch in fetchPosts " + error);
      })
  }
}